/* ============================================
   ADORABLE ACCOUNTABILITY — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

    });

    // --- Mobile menu toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Smooth scroll for anchor links (skip external links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return; // Skip dead links
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Category Browse → Auto-Filter Products ---
    document.querySelectorAll('.category-browse').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = btn.dataset.cat;
            // Scroll to products
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                const top = productsSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            // Click the matching filter button
            setTimeout(() => {
                const filterBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
                if (filterBtn) filterBtn.click();
            }, 400);
        });
    });

    // --- Personalization CTA → Studio Redirect ---
    const personalizeCta = document.getElementById('personalize-cta');
    if (personalizeCta) {
        personalizeCta.addEventListener('click', (e) => {
            e.preventDefault();
            const habit = document.getElementById('personal-habit')?.value || 'Meditation';
            const theme = document.getElementById('personal-theme')?.value || 'calm';
            const duration = document.getElementById('personal-duration')?.value || '30';
            const name = document.getElementById('personal-name')?.value || '';
            const params = new URLSearchParams({ habit, theme, duration });
            if (name) params.set('name', name);
            window.location.href = `studio.html?${params.toString()}`;
        });
    }

    // --- Interactive Sticker Toggle on Product Cards ---
    document.querySelectorAll('.sticker-check').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const card = checkbox.closest('.product-card');
            const label = checkbox.closest('.product-sticker-upsell');
            const cta = card?.querySelector('.btn-primary');
            if (!cta) return;

            const url = new URL(cta.href, window.location.origin);
            if (checkbox.checked) {
                url.searchParams.set('stickers', 'true');
                label.classList.add('active');
            } else {
                url.searchParams.delete('stickers');
                label.classList.remove('active');
            }
            cta.href = url.pathname + url.search;
        });
    });

    // --- Color Swatch ↔ Theme Dropdown Sync (single handler, no duplicate) ---
    const personalThemeSelect = document.getElementById('personal-theme');
    if (personalThemeSelect) {
        personalThemeSelect.addEventListener('change', () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            const match = document.querySelector(`.color-swatch[data-theme="${personalThemeSelect.value}"]`);
            if (match) match.classList.add('active');
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            // Toggle current
            if (!isActive) item.classList.add('active');
        });
    });

    // --- Product Filter ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.product-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.opacity = '1';
                    card.style.transform = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Testimonial Carousel ---
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
        currentSlide = index;
        if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    // Auto-advance
    setInterval(() => {
        if (totalSlides > 0) goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);

    // --- Personalization Live Preview ---
    const nameInput = document.getElementById('personal-name');
    const habitSelect = document.getElementById('personal-habit');
    const durationSelect = document.getElementById('personal-duration');
    const themeSelect = document.getElementById('personal-theme');
    const previewTitle = document.getElementById('preview-title');
    const previewTracker = document.getElementById('preview-tracker');
    const previewChar = document.getElementById('preview-char');
    const previewGrid = document.getElementById('preview-grid');

    const themes = {
        calm: { bg: '#E8F0E4', cell: '#A8C5A0', cellAlt: '#C8DFC3', char: '🧘' },
        cozy: { bg: '#FDE8DE', cell: '#F5D6C8', cellAlt: '#E4A98E', char: '🧸' },
        minimal: { bg: '#F0EEF3', cell: '#C8B8DB', cellAlt: '#DDD5E8', char: '✨' },
        nature: { bg: '#DCF0E8', cell: '#B8E0D2', cellAlt: '#90C8B8', char: '🌿' }
    };

    function updatePreview() {
        if (!previewTitle) return;
        const name = nameInput?.value || 'Your Name';
        const habit = habitSelect?.value || 'Meditation';
        const duration = parseInt(durationSelect?.value) || 30;
        const theme = themes[themeSelect?.value] || themes.calm;

        previewTitle.textContent = `${name}'s ${habit}`;
        if (previewTracker) previewTracker.style.background = theme.bg;
        if (previewChar) previewChar.textContent = theme.char;

        if (previewGrid) {
            previewGrid.innerHTML = '';
            for (let i = 0; i < duration; i++) {
                const cell = document.createElement('div');
                cell.className = 'preview-cell';
                cell.style.background = i % 2 === 0 ? theme.cell : theme.cellAlt;
                if (i < 5) cell.style.opacity = '0.6';
                previewGrid.appendChild(cell);
            }
        }
    }

    [nameInput, habitSelect, durationSelect, themeSelect].forEach(el => {
        if (el) el.addEventListener('input', updatePreview);
        if (el) el.addEventListener('change', updatePreview);
    });

    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            if (themeSelect) {
                themeSelect.value = sw.dataset.theme;
                updatePreview();
            }
        });
    });

    updatePreview();

    // --- Sticker upsell toggle --- B3 fix: standardised to $7
    document.querySelectorAll('.product-sticker-upsell').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('added');
            if (btn.classList.contains('added')) {
                btn.innerHTML = '🎉 Stickers added! (+$7)';
                btn.style.background = 'var(--sage)';
                btn.style.color = 'white';
            } else {
                btn.innerHTML = '🌟 Add matching stickers +$7';
                btn.style.background = '';
                btn.style.color = '';
            }
        });
    });

    // --- Email forms: both handled by ConvertKit embed (see form HTML).
    // Fallback handler shows a friendly message if ConvertKit isn't loaded yet.
    ['cta-form', 'subscribe-form'].forEach(id => {
        const form = document.getElementById(id);
        if (form && !form.dataset.ckManaged) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                const btn = form.querySelector('button');
                if (emailInput && emailInput.value) {
                    btn.textContent = '✓ You\'re on the list!';
                    btn.style.background = 'var(--sage-dark)';
                    emailInput.value = '';
                    setTimeout(() => {
                        btn.textContent = btn.dataset.originalText || 'Subscribe';
                        btn.style.background = '';
                    }, 3000);
                }
            });
        }
    });

    // --- Floating elements parallax ---
    document.addEventListener('mousemove', (e) => {
        const floaters = document.querySelectorAll('.hero-float');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        floaters.forEach((f, i) => {
            const speed = (i + 1) * 0.5;
            f.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // --- Counter animation for proof bar ---
    const counters = document.querySelectorAll('.proof-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.dataset.value;
                // B1 fix: use parseFloat so "4.9" doesn't become 49
                const numericPart = parseFloat(finalText.replace(/[^0-9.]/g, ''));
                const suffix = finalText.replace(/[0-9.]/g, '');
                let current = 0;
                const step = Math.ceil(numericPart / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= numericPart) {
                        current = numericPart;
                        clearInterval(timer);
                    }
                    target.textContent = current.toLocaleString() + suffix;
                }, 30);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

});
