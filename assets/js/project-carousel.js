/**
 * Project Carousel Modal Handler
 * Self-contained carousel — no dependency on Preline's HSCarousel.
 */
(function () {
    'use strict';

    /* ── Project data ── */
    const projectsData = {

        // Web Applications
        'maison':{
            title: 'Maison',
            images: ['assets/images/projects/Maison/Hero.png',
                'assets/images/projects/Maison/features.png',
                'assets/images/projects/Maison/shop.png',
                'assets/images/projects/Maison/contact.png',
            ]
        },

        'farmura-admin':{
            title: 'FARMURA Admin',
            images: ['assets/images/projects/FARMURA-admin/LOGIN.png',
                'assets/images/projects/FARMURA-admin/dashboard.png',
                'assets/images/projects/FARMURA-admin/pasakay.png',
                'assets/images/projects/FARMURA-admin/pasugo.png',
            ]
        },

        'image-editor': {
            title: 'Image Editor',
            images: ['assets/images/projects/editor.png',
                'assets/images/projects/404.png']
        },
        'optical-capstone': {
            title: 'Web-Based Appointment & Management System',
            images: ['assets/images/projects/optical.png',
                'assets/images/projects/404.png']
        },
        'journal-science': {
            title: 'Journal of Science',
            images: ['assets/images/projects/Journal/landing pages.png',
                'assets/images/projects/Journal/LOGIN.png',
                'assets/images/projects/Journal/articles.png',
                'assets/images/projects/Journal/viewarticles.png']
        },
        'boarding-house': {
            title: 'Boarding House Management System',
            images: ['assets/images/projects/404.png']
        },
        'document-management': {
            title: 'Document Management System',
            images: ['assets/images/projects/404.png']
        },

        // Desktop Applications
        'hotel-reservation': {
            title: 'Hotel Reservation System',
            images: ['assets/images/projects/hotel.png']
        },
        'pos-inventory': {
            title: 'POS and Inventory System',
            images: ['assets/images/projects/404.png']
        },


        // UI/UX Designs
        'Wanderly':{
            title: 'Wanderly',
            previewUrl: 'https://www.figma.com/design/mG5mc4sgmxZv2qExdqujop/Wanderly?node-id=0-1&t=Qg5ADh2d5et0sj4Z-1',
            images: ['assets/images/projects/Wanderly/Hero.png',
                'assets/images/projects/Wanderly/Section.png',
                'assets/images/projects/Wanderly/Section-1.png'

            ]
        },
        'farmura': {
            title: 'FARMURA',
            previewUrl: '',
            images: ['assets/images/projects/FARMURA/FARMURA-thumbnail.png',
                'assets/images/projects/FARMURA/Login.png',
                'assets/images/projects/FARMURA/SIGNUP.png',
                'assets/images/projects/FARMURA/Home.png',
                'assets/images/projects/FARMURA/Services.png',
                'assets/images/projects/FARMURA/Wallet.png'
            ]
        },
        'wine-price-edge': {
            title: 'Wine Price Edge Solutions',
            previewUrl: 'https://www.figma.com/design/UKhhkqyYvLsDniZqskzdHK/Wine-App?node-id=1-1446&t=DZnHyRRHkcanzI49-1',
            images: ['assets/images/projects/Wine/WINEAPP-thumbnail.png',
                'assets/images/projects/Wine/Login Mobile-1.png',
                'assets/images/projects/Wine/Login Mobile.png',
                'assets/images/projects/Wine/Search - Mobile.png',
                'assets/images/projects/Wine/Upload CSV - Mobile.png',
                'assets/images/projects/Wine/Annotation Results & Analytics - Mobile.png'
            ]
        },
        'dm-resto': {
            title: 'DM Resto (POS and Inventory System)',
            previewUrl: 'https://www.figma.com/design/O8ta1Cgja5nEQCKBNeHoVN/DM-Resto?node-id=1-1201&t=otZYSQsBm73w5viL-1',
            images: ['assets/images/projects/Resto/dmresto.png',
                'assets/images/projects/Resto/LOGIN PAGE.png',
                'assets/images/projects/Resto/LANDING PAGE.png',
                'assets/images/projects/Resto/DASHBOARD.png',
                'assets/images/projects/Resto/Menu.jpg']
        },
        'datedash': {
            title: 'DateDash App',
            previewUrl: 'https://www.figma.com/design/EzC614eVRUmXeG14LJRPHy/DateDash?node-id=0-1&t=H4keZbnCrwGJoyTK-1',
            images: ['assets/images/projects/Datedash/datedash.png',
                'assets/images/projects/Datedash/Signup.png',
                'assets/images/projects/Datedash/Main 3.png',
                'assets/images/projects/Datedash/Match.png',
                'assets/images/projects/Datedash/Location.png']
        }
    };

    /* ── DOM refs (set once in init) ── */
    let overlay, titleEl, previewLinkEl, track, dotsContainer, prevBtn, nextBtn, closeBtn;
    let currentIndex = 0;
    let slideCount = 0;
    let autoplayTimer = null;

    /* ── Initialise ── */
    function init() {
        overlay        = document.getElementById('project-preview-modal');
        titleEl        = document.getElementById('modal-project-title');
        track          = document.getElementById('carousel-track');
        dotsContainer  = document.getElementById('carousel-dots');
        prevBtn        = document.getElementById('carousel-prev');
        nextBtn        = document.getElementById('carousel-next');
        closeBtn       = document.getElementById('modal-close-btn');
        previewLinkEl  = document.getElementById('modal-preview-link');

        if (!overlay || !track) return;

        // Card click handlers
        document.querySelectorAll('[data-project-id]').forEach(function (card) {
            card.addEventListener('click', onCardClick);
        });

        // Carousel controls
        prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
        nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

        // Close modal
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    /* ── Card click → open modal ── */
    function onCardClick() {
        var id   = this.getAttribute('data-project-id');
        var data = projectsData[id];
        if (!data) return;
        openModal(data.title, data.images, data.previewUrl);
    }

    /* ── Open modal & build slides ── */
    function openModal(title, images, previewUrl) {
        titleEl.textContent = title;

        // Show or hide the Figma preview link
        if (previewLinkEl) {
            if (previewUrl) {
                previewLinkEl.href = previewUrl;
                previewLinkEl.style.display = 'inline-flex';
            } else {
                previewLinkEl.style.display = 'none';
            }
        }

        // Build slides
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        slideCount = images.length;
        currentIndex = 0;

        images.forEach(function (src, i) {
            // Slide
            var slide = document.createElement('div');
            slide.className = 'project-carousel-slide';
            var img = document.createElement('img');
            img.src = src;
            img.alt = title + ' — image ' + (i + 1);
            img.onerror = function () { this.src = ''; };
            slide.appendChild(img);
            track.appendChild(slide);

            // Dot
            if (slideCount > 1) {
                var dot = document.createElement('button');
                dot.className = 'project-carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('type', 'button');
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.addEventListener('click', function () { goTo(i); });
                dotsContainer.appendChild(dot);
            }
        });

        // Hide arrows when only 1 image
        prevBtn.style.display = slideCount > 1 ? '' : 'none';
        nextBtn.style.display = slideCount > 1 ? '' : 'none';

        // Position track
        track.style.transform = 'translateX(0)';

        // Show overlay
        overlay.style.display = 'flex';
        // Force reflow so the transition fires
        void overlay.offsetWidth;
        overlay.classList.add('is-open');

        // Start autoplay
        startAutoplay();
    }

    /* ── Close modal ── */
    function closeModal() {
        stopAutoplay();
        overlay.classList.remove('is-open');
        // Wait for fade-out transition
        setTimeout(function () {
            overlay.style.display = 'none';
            track.innerHTML = '';
            dotsContainer.innerHTML = '';
        }, 300);
    }

    /* ── Navigate ── */
    function goTo(index) {
        if (slideCount <= 1) return;
        currentIndex = ((index % slideCount) + slideCount) % slideCount;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        // Update dots
        var dots = dotsContainer.querySelectorAll('.project-carousel-dot');
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === currentIndex);
        });
        // Reset autoplay timer
        stopAutoplay();
        startAutoplay();
    }

    /* ── Autoplay ── */
    function startAutoplay() {
        if (slideCount <= 1) return;
        autoplayTimer = setInterval(function () {
            goTo(currentIndex + 1);
        }, 4000);
    }
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    /* ── Public API ── */
    window.ProjectCarousel = {
        registerProject: function (id, data) { projectsData[id] = data; },
        showPreview: function (title, images) { openModal(title, images); },
        refresh: function () {
            document.querySelectorAll('[data-project-id]').forEach(function (card) {
                card.removeEventListener('click', onCardClick);
                card.addEventListener('click', onCardClick);
            });
        }
    };

    /* ── Boot ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
