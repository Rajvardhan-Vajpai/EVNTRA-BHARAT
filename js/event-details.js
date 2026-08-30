/**
 * ==========================================================================
 * EVENTRA BHARAT - PREMIUM EVENT DETAILS PLATFORM ENGINE
 * Architecture: Modular Lifecycle Framework, Cached DOM Pipeline, and Decoupled State
 * Design System Inspired by Apple Ecosystem, Airbnb Lifecycles, and BookMyShow Systems
 * ==========================================================================
 */

"use strict";

(() => {
    // ==========================================
    // DOM Elements Cache
    // ==========================================
    const DOM = {
        // Core Layout & Navigation
        navbar: document.querySelector('.GlobalStickyHeader') || document.getElementById('navbar'),
        heroBookBtn: document.querySelector('.ExtendedHeroBanner .LuxuryCtaPrimary') || document.querySelector('[href="#bookingAnchorZone"]'),
        bookingAnchorZone: document.getElementById('bookingAnchorZone') || document.querySelector('.GlassmorphicBookingCard'),
        
        // Dynamic Content Containers
        galleryGrid: document.getElementById('galleryGrid'),
        scheduleTimeline: document.getElementById('scheduleTimeline'),
        reviewGrid: document.getElementById('reviewGrid'),
        relatedEventsGrid: document.getElementById('relatedEventsGrid'),
        venueMap: document.getElementById('venueMap'),

        // Interactive Booking Elements
        ticketQuantity: document.getElementById('ticketQuantity'),
        ticketDecrementBtn: document.querySelector('.QuantityWidgetButton:first-child'),
        ticketIncrementBtn: document.querySelector('.QuantityWidgetButton:last-child'),
        ticketTypeSelect: document.getElementById('ticketTypeSelectionField') || document.getElementById('ticketType'),
        invoiceSubtotal: document.getElementById('invoiceSubtotalDisplay'),
        invoiceTotal: document.getElementById('invoiceTotalDisplay'),
        bookNowBtn: document.getElementById('bookNowBtn'),

        // Utility Features
        wishlistBtn: document.getElementById('wishlistBtn'),
        shareBtn: document.getElementById('shareBtn'),
        newsletterForm: document.getElementById('newsletterForm'),
        faqHeaders: document.querySelectorAll('.AccordionInteractiveHeader'),
        
        // Generic Scroll Nodes
        get revealNodes() { return document.querySelectorAll('.interaction-reveal-node, section'); }
    };

    // ==========================================
    // Application State Management
    // ==========================================
    const State = {
        currentTicketPrice: 0,
        currentQuantity: 1,
        selectedType: '',
        isWishlisted: false,
        eventId: 'EVB_2026_MUGHAL_HERITAGE' // Standardized platform scope key
    };

    // ==========================================
    // Configuration Data Matrix
    // ==========================================
    const Data = {
        TicketPricing: {
            'imperial_4day': { price: 8500, label: 'Imperial 4-Day Pass' },
            'royal_vip_4day': { price: 18000, label: 'Royal VIP Elite Courtyard' },
            'connoisseur_single_day': { price: 3500, label: 'Connoisseur Single Day Pass' }
        },
        FallbackImage: '../assets/images/dynamic/Sunburn_Festival_Goa_2026.webp',
        Gallery: [
            { image: "../assets/images/dynamic/Grand_Courtyard_Setup.webp", title: 'Grand Courtyard Setup', alt: 'Imperial event lighting at night over a majestic palace courtyard' },
            { image: "../assets/images/dynamic/Sufi_Symphony_Night.webp", title: 'Sufi Symphony Night', alt: 'Artists performing under ambient classical red and gold illumination' },
            { image: "../assets/images/dynamic/The_Royal_Banquet_Dinner.webp", title: 'The Royal Banquet Dinner', alt: 'Long heritage luxury dining tables meticulously prepared for dignitaries' },
            { image: "../assets/images/dynamic/Illuminated_Palace_Arches.webp", title: 'Illuminated Palace Arches', alt: 'Stunning exterior mapping showcase on classical sandstone fortresses' },
            { image: "../assets/images/dynamic/Kathak_Confluence_Stage.webp", title: 'Kathak Confluence Stage', alt: 'Dynamic capturing of classical Indian classical dance forms in action' },
            { image: "../assets/images/dynamic/Acoustic_Sound_Mapping.webp", title: 'Acoustic Sound Mapping', alt: 'State-of-the-art concert system arrays embedded inside ancient architectures' },
            { image: "../assets/images/dynamic/Dignitary_Welcome_Array.webp", title: 'Dignitary Welcome Array', alt: 'Saffron flower carpets and royal traditional lines extending to guests' },
            { image: "../assets/images/dynamic/Glow_Finale_Showcase.webp", title: 'Glow Finale Showcase', alt: 'Spectacular synchronization of eco-friendly sparklers over water bodies' }
        ],
        Timeline: [
            { time: '04:00 PM', title: 'Entry Opens', description: 'Royal verification checkpoints begin greeting patrons at the Outer Bastion gates.', icon: 'fa-door-open' },
            { time: '05:30 PM', title: 'Welcome Ceremony', description: 'Ancestral red carpet reception featuring Vedic chants, rose-petal arrays, and imperial brass bands.', icon: 'fa-republican' },
            { time: '07:00 PM', title: 'Main Performance', description: 'The centerpiece cinematic audio-visual symphony inside the inner darbar courtyard.', icon: 'fa-guitars' },
            { time: '09:00 PM', title: 'Dinner Experience', description: 'A curated 7-course culinary exploration crafted by legendary master chefs spanning royal Gharanas.', icon: 'fa-utensils' },
            { time: '10:30 PM', title: 'Closing Performance', description: 'Grand light mapping synthesis reflecting modern India against ancient architectural stonework.', icon: 'fa-sparkles' },
            { time: '11:30 PM', title: 'Farewell', description: 'Distribution of personalized commemorative artifacts and continuous VIP fleet drop-offs.', icon: 'fa-gift' }
        ],
        Reviews: [
            { name: 'Aishwarya Roy', rating: 5, date: 'May 12, 2026', avatar: 'AR', text: 'An absolute masterpiece of cultural production. Every single detail from the entry gates to the dining sequence breathed luxury. Truly lives up to the Incredible India premium promise.', country: 'India', verified: true },
            { name: 'Julian Mercer', rating: 5, date: 'May 24, 2026', avatar: 'JM', text: 'Traveling across Rajasthan and Delhi for years, but this evening curated by Eventra Bharat redefined immersive travel. The acoustic profile inside the ancient walls was astonishing.', country: 'United Kingdom', verified: true },
            { name: 'Vikramaditya Rao', rating: 4, date: 'June 02, 2026', avatar: 'VR', text: 'The Imperial Pass is completely worth the premium tier allocation. Fast tracking through logistics saved immense time. The food database integration was impeccable.', country: 'India', verified: true },
            { name: 'Elena Rostova', rating: 5, date: 'June 15, 2026', avatar: 'ER', text: 'Stunning preservation of art packaged inside an elite, highly professional event. The lighting design felt highly artistic, subtle, yet incredibly grand. Exceptional.', country: 'Germany', verified: true },
            { name: 'Devendra Sharma', rating: 5, date: 'June 28, 2026', avatar: 'DS', text: 'Unmatched scale. The hospitality team handled thousands with the delicacy of an elegant private lounge framework. Booking process on this page was completely frictionless.', country: 'India', verified: true },
            { name: 'Ananya Deshmukh', rating: 4, date: 'July 02, 2026', avatar: 'AD', text: 'Marvelous integration of technology and heritage. The ticketing configuration was very straightforward, and the post-purchase dynamic ledger worked flawlessly.', country: 'India', verified: true }
        ],
        RelatedEvents: [
            { image: "../assets/images/dynamic/Varanasi_Dev_Deepawali_Cruise_Lux.webp", title: 'Varanasi Dev Deepawali Cruise Lux', city: 'Varanasi', price: '₹12,500', rating: '4.9', category: 'Heritage Spiritual' },
            { image: "../assets/images/dynamic/Udaipur_Mewar_Symphony_Gala.webp", title: 'Udaipur Mewar Symphony Gala', city: 'Udaipur', price: '₹18,000', rating: '5.0', category: 'Royal Music' },
            { image: "../assets/images/dynamic/Khajuraho_Classical_Dance_Soiree.webp", title: 'Khajuraho Classical Dance Soiree', city: 'Khajuraho', price: '₹6,000', rating: '4.8', category: 'Dance Fine Arts' },
            { image: "../assets/images/dynamic/Jaipur_Literature_Durbar_Banquet.webp", title: 'Jaipur Literature Durbar Banquet', city: 'Jaipur', price: '₹9,500', rating: '4.7', category: 'Literary Luxury' },
            { image: "../assets/images/dynamic/Taj_Mahal_Cinematic_Night_View_Tour.webp", title: 'Taj Mahal Cinematic Night View Tour', city: 'Agra', price: '₹14,000', rating: '4.9', category: 'Exquisite Monuments' },
            { image: "../assets/images/dynamic/Hampi_Virupaksha_Ruins_Laser_Mapping.webp", title: 'Hampi Virupaksha Ruins Laser Mapping', city: 'Hampi', price: '₹5,500', rating: '4.8', category: 'Tech Architecture' }
        ]
    };

    // ==========================================
    // Utility Functions
    // ==========================================
    const Utils = {
        formatCurrency: (amount) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount);
        },

        createStars: (rating) => {
            let starsHTML = '';
            const floor = Math.floor(rating);
            for (let i = 0; i < 5; i++) {
                if (i < floor) {
                    starsHTML += '<i class="fa-solid fa-star PremiumStarTone"></i>';
                } else {
                    starsHTML += '<i class="fa-regular fa-star PremiumStarTone"></i>';
                }
            }
            return starsHTML;
        },

        removeSkeletonLoaders: (container) => {
            if (!container) return;
            const skeletons = container.querySelectorAll('.skeleton-loader, [class*="Skeleton"], .SkeletonElement');
            skeletons.forEach(el => el.remove());
        }
    };

    // ==========================================
    // Toast Notification System
    // ==========================================
    const ToastSystem = {
        initContainer: () => {
            let container = document.getElementById('globalToastSystemContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'globalToastSystemContainer';
                // Inline structural styles ensuring global layout isolation
                Object.assign(container.style, {
                    position: 'fixed',
                    top: '24px',
                    right: '24px',
                    zIndex: '99999',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    pointerEvents: 'none'
                });
                document.body.appendChild(container);
            }
            return container;
        },

        show: (message) => {
            const container = ToastSystem.initContainer();
            const toast = document.createElement('div');
            
            // Micro-styled premium layout architecture matching variables
            Object.assign(toast.style, {
                background: 'rgba(31, 31, 31, 0.96)',
                color: '#FFFDF8',
                padding: '1rem 2rem',
                borderRadius: '60px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)',
                opacity: '0',
                transform: 'translateY(-20px) scale(0.95)',
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                pointerEvents: 'auto'
            });

            toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #C79A2B;"></i> <span>${message}</span>`;
            container.appendChild(toast);

            // Trigger animation frame layout reflow execution
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0) scale(1)';
            });

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-10px) scale(0.95)';
                setTimeout(() => toast.remove(), 400);
            }, 3500);
        }
    };

    // Public mapping onto the root request schema
    window.showToast = ToastSystem.show;

    // ==========================================
    // Feature Module Implementations
    // ==========================================
    
    // Feature 1: Render Gallery System
    const GalleryModule = {
        createItem: (item) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'GalleryItemWrapper interaction-reveal-node';
            wrapper.innerHTML = `
                <img src="${item.image}" alt="${item.alt}" class="GalleryImageNode" loading="lazy" onerror="this.onerror=null;this.src='${Data.FallbackImage}';">
                <div class="VisuallyHidden">${item.title}</div>
            `;
            return wrapper;
        },
        render: () => {
            if (!DOM.galleryGrid) return;
            Utils.removeSkeletonLoaders(DOM.galleryGrid);
            
            const fragment = document.createDocumentFragment();
            Data.Gallery.forEach(item => {
                fragment.appendChild(GalleryModule.createItem(item));
            });
            DOM.galleryGrid.appendChild(fragment);
        }
    };

    // Feature 2: Render Timeline Matrix
    const TimelineModule = {
        createItem: (node) => {
            const container = document.createElement('div');
            container.className = 'TimelineNodeRow interaction-reveal-node';
            container.innerHTML = `
                <div class="TimelineMarkerAnchor"></div>
                <div class="TimelineCardBlock">
                    <span class="TimelineTimeBadge"><i class="fa-regular fa-clock"></i> ${node.time}</span>
                    <h3>${node.title}</h3>
                    <p>${node.description}</p>
                </div>
            `;
            return container;
        },
        render: () => {
            if (!DOM.scheduleTimeline) return;
            Utils.removeSkeletonLoaders(DOM.scheduleTimeline);

            const fragment = document.createDocumentFragment();
            Data.Timeline.forEach(node => {
                fragment.appendChild(TimelineModule.createItem(node));
            });
            DOM.scheduleTimeline.appendChild(fragment);
        }
    };

    // Feature 3: Render Reviews Panel
    const ReviewsModule = {
        createCard: (review) => {
            const element = document.createElement('div');
            element.className = 'ReviewCardInstance interaction-reveal-node';
            element.innerHTML = `
                <div class="ReviewCardHeader">
                    <div class="ReviewerInfo">
                        <div class="ReviewerAvatar">${review.avatar}</div>
                        <div class="ReviewerMeta">
                            <h4>${review.name}</h4>
                            <span class="ReviewDate">${review.date}</span>
                        </div>
                    </div>
                    <div class="ScoreStarsRow">
                        ${Utils.createStars(review.rating)}
                    </div>
                </div>
                <div class="ReviewTextBody">
                    <p class="text-muted" style="font-size: 0.95rem; line-height: 1.6;">"${review.text}"</p>
                </div>
                <div class="OrganizerActionPanelRow" style="margin-top:1rem; padding-top:0.75rem; border-top:1px dashed #EAEAEA;">
                    <span class="CorporateMetaSummary"><i class="fa-solid fa-earth-asia"></i> Location: ${review.country}</span>
                    ${review.verified ? `<span class="VerificationStatusBadge"><i class="fa-solid fa-circle-check"></i> Verified Patron</span>` : ''}
                </div>
            `;
            return element;
        },
        render: () => {
            if (!DOM.reviewGrid) return;
            Utils.removeSkeletonLoaders(DOM.reviewGrid);

            const fragment = document.createDocumentFragment();
            Data.Reviews.forEach(rev => {
                fragment.appendChild(ReviewsModule.createCard(rev));
            });
            DOM.reviewGrid.appendChild(fragment);
        }
    };

    // Feature 4: Render Related Events Architecture
    const RelatedEventsModule = {
        createCard: (event) => {
            const card = document.createElement('div');
            card.className = 'StandardEventModularCard interaction-reveal-node';
            card.innerHTML = `
                <div class="CardImageStructuralFrame">
                    <img src="${event.image}" alt="${event.title}" class="CardEmbeddedImageAsset" loading="lazy" onerror="this.onerror=null;this.src='${Data.FallbackImage}';">
                    <span class="CardFloatingRibbonBadge">${event.category}</span>
                </div>
                <div class="CardDiscoveryContentTray">
                    <div class="HeroRatingGroup" style="font-size: 0.85rem;">
                        <i class="fa-solid fa-star PremiumStarTone"></i>
                        <span class="RatingValueMetric">${event.rating}</span>
                    </div>
                    <h3>${event.title}</h3>
                    <div class="CardMetaLocationLine">
                        <i class="fa-solid fa-location-dot" style="color: #C79A2B;"></i>
                        <span>${event.city}</span>
                    </div>
                    <div class="CardBottomPricingRow">
                        <div>
                            <span style="font-size: 0.75rem; text-transform: uppercase; color: #666666; display: block;">From</span>
                            <span class="CardPriceLabel">${event.price}</span>
                        </div>
                        <button class="ActionButtonPrimary" onclick="window.location.href='event-details.html?id=${event.id || event.title}'" style="padding: 0.5rem 1.25rem; font-size: 0.8rem;">Explore Details</button>
                    </div>
                </div>
            `;
            return card;
        },
        render: () => {
            if (!DOM.relatedEventsGrid) return;
            Utils.removeSkeletonLoaders(DOM.relatedEventsGrid);

            const fragment = document.createDocumentFragment();
            Data.RelatedEvents.forEach(evt => {
                fragment.appendChild(RelatedEventsModule.createCard(evt));
            });
            DOM.relatedEventsGrid.appendChild(fragment);
        }
    };

    // Feature 5 & 11: Booking Card Operations & Form Pipeline Processing
    const BookingModule = {
        init: () => {
            if (!DOM.ticketQuantity || !DOM.ticketTypeSelect) return;

            // Bind native option update processing cycles
            DOM.ticketTypeSelect.addEventListener('change', BookingModule.updateInvoicePricing);
            DOM.ticketQuantity.addEventListener('input', BookingModule.validateAndNormalizeQuantity);

            if (DOM.ticketDecrementBtn && DOM.ticketIncrementBtn) {
                DOM.ticketDecrementBtn.addEventListener('click', () => BookingModule.adjustQuantity(-1));
                DOM.ticketIncrementBtn.addEventListener('click', () => BookingModule.adjustQuantity(1));
            }

            if (DOM.bookNowBtn) {
                DOM.bookNowBtn.addEventListener('click', BookingModule.executeCheckoutProcess);
            }

            // Fire structural defaults configuration bootstrap
            BookingModule.updateInvoicePricing();
        },

        adjustQuantity: (delta) => {
            let value = parseInt(DOM.ticketQuantity.value, 10) || 1;
            value += delta;
            DOM.ticketQuantity.value = value;
            BookingModule.validateAndNormalizeQuantity();
        },

        validateAndNormalizeQuantity: () => {
            let qty = parseInt(DOM.ticketQuantity.value, 10);
            if (isNaN(qty) || qty < 1) {
                qty = 1;
            } else if (qty > 10) {
                qty = 10;
                ToastSystem.show("Maximum allocation strategy limited to 10 passes per dynamic portfolio.");
            }
            DOM.ticketQuantity.value = qty;
            State.currentQuantity = qty;
            BookingModule.calculateTotal();
        },

        updateInvoicePricing: () => {
            if (!DOM.ticketTypeSelect) return;
            const selection = DOM.ticketTypeSelect.value;
            const fallbackKey = Object.keys(Data.TicketPricing)[0];
            const configuration = Data.TicketPricing[selection] || Data.TicketPricing['imperial'] || Data.TicketPricing[fallbackKey];
            
            if (!configuration) return;

            State.currentTicketPrice = configuration.price;
            State.selectedType = configuration.label;
            
            const tierTitle = document.getElementById('dynamic-tier-title');
            if (tierTitle) tierTitle.textContent = configuration.label;
            
            const widgetPrice = document.getElementById('dynamic-widget-price');
            if (widgetPrice) widgetPrice.textContent = Utils.formatCurrency(configuration.price);
            
            BookingModule.calculateTotal();
        },

        calculateTotal: () => {
            const subtotal = State.currentTicketPrice * State.currentQuantity;
            const absoluteTotal = subtotal; // Platform architecture scaling hooks for operational tax injections

            if (DOM.invoiceSubtotal) DOM.invoiceSubtotal.textContent = Utils.formatCurrency(subtotal);
            if (DOM.invoiceTotal) DOM.invoiceTotal.textContent = Utils.formatCurrency(absoluteTotal);
        },

        executeCheckoutProcess: (e) => {
            e.preventDefault();
            
            // Re-validate runtime specifications evaluation logic
            BookingModule.validateAndNormalizeQuantity();
            
            const btn = DOM.bookNowBtn;
            const layoutBackupText = btn.innerHTML;
            
            // Enter systemic transaction processing workflow mode
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Secure Pipeline...`;
            
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Redirecting to Checkout...`;
                ToastSystem.show(`Reservation verified! Secured allocation of ${State.currentQuantity}x ${State.selectedType}.`);
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = layoutBackupText;
                    window.location.href = `registration.html?event=${State.eventId}&qty=${State.currentQuantity}&type=${encodeURIComponent(State.selectedType)}`;
                }, 1500);
            }, 1000);
        }
    };

    // Feature 6: Wishlist State Isolation Engine
    const WishlistModule = {
        init: () => {
            if (!DOM.wishlistBtn) return;
            
            // Pull existing device configuration sequence values
            const storageKey = `EVB_WISH_${State.eventId}`;
            State.isWishlisted = localStorage.getItem(storageKey) === 'true';
            
            WishlistModule.updateVisualInterface(false);
            DOM.wishlistBtn.addEventListener('click', WishlistModule.toggleState);
        },
        toggleState: () => {
            State.isWishlisted = !State.isWishlisted;
            const storageKey = `EVB_WISH_${State.eventId}`;
            localStorage.setItem(storageKey, State.isWishlisted.toString());
            
            WishlistModule.updateVisualInterface(true);
        },
        updateVisualInterface: (triggerToast) => {
            const btn = DOM.wishlistBtn;
            const icon = btn.querySelector('i');
            
            if (State.isWishlisted) {
                btn.setAttribute('data-favorited', 'true');
                if (icon) {
                    icon.className = 'fa-solid fa-heart';
                    icon.style.color = '#C62828';
                }
                if (triggerToast) ToastSystem.show("Added to Wishlist");
            } else {
                btn.setAttribute('data-favorited', 'false');
                if (icon) {
                    icon.className = 'fa-regular fa-heart';
                    icon.style.color = '';
                }
                if (triggerToast) ToastSystem.show("Removed from Wishlist");
            }
        }
    };

    // Feature 7: Web Share Interoperability Broker
    const ShareModule = {
        init: () => {
            if (!DOM.shareBtn) return;
            DOM.shareBtn.addEventListener('click', ShareModule.processDistributionShare);
        },
        processDistributionShare: async () => {
            const datasetPayload = {
                title: document.title || 'Eventra Bharat Premium Experience',
                text: 'Discover exceptional luxury heritage pathways within dynamic Indian landscapes.',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(datasetPayload);
                } catch (err) {
                    // Fail silently over standard client interface window cancellations
                }
            } else {
                try {
                    await navigator.clipboard.writeText(datasetPayload.url);
                    ToastSystem.show("Link Copied to Clipboard");
                } catch (err) {
                    ToastSystem.show("Unable to map clipboard distribution protocols.");
                }
            }
        }
    };

    // Feature 8: Micro-Interaction Animation Traversal Focus Anchors
    const NavigationScrollModule = {
        init: () => {
            if (!DOM.heroBookBtn) return;
            DOM.heroBookBtn.addEventListener('click', NavigationScrollModule.handleSmoothAnchorScroll);
        },
        handleSmoothAnchorScroll: (e) => {
            e.preventDefault();
            if (DOM.bookingAnchorZone) {
                DOM.bookingAnchorZone.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Active focus handling architecture optimization pattern
                setTimeout(() => {
                    const focusTarget = DOM.bookingAnchorZone.querySelector('select, input, button');
                    if (focusTarget) focusTarget.focus({ preventScroll: true });
                }, 800);
            }
        }
    };

    // Feature 9: Accessible FAQ Accordion Orchestration Core
    const AccordionModule = {
        init: () => {
            if (!DOM.faqHeaders.length) return;
            
            DOM.faqHeaders.forEach(header => {
                header.addEventListener('click', () => AccordionModule.toggleDrawer(header));
                
                // Add keydown listener for keyboard accessibility (Space/Enter)
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        AccordionModule.toggleDrawer(header);
                    }
                });
            });
        },
        toggleDrawer: (clickedHeader) => {
            const isActive = clickedHeader.getAttribute('aria-expanded') === 'true';
            
            // Architectural constraint enforcement condition: Only one open at any single transactional slice
            DOM.faqHeaders.forEach(header => {
                header.setAttribute('aria-expanded', 'false');
                const drawer = header.nextElementSibling;
                if (drawer && drawer.classList.contains('AccordionContentDrawer')) {
                    drawer.style.maxHeight = null;
                    drawer.setAttribute('hidden', 'true');
                }
            });

            if (!isActive) {
                clickedHeader.setAttribute('aria-expanded', 'true');
                const dynamicDrawer = clickedHeader.nextElementSibling;
                if (dynamicDrawer && dynamicDrawer.classList.contains('AccordionContentDrawer')) {
                    dynamicDrawer.removeAttribute('hidden');
                    // Dynamic layout metrics compilation evaluation matching animation states
                    dynamicDrawer.style.maxHeight = `${dynamicDrawer.scrollHeight}px`;
                }
            }
        }
    };

    // Feature 10: CRM Subscription Validation Interface Matrix
    const NewsletterModule = {
        init: () => {
            if (!DOM.newsletterForm) return;

            const nlWantsWhatsapp = document.getElementById('nlWantsWhatsapp');
            const nlWhatsapp = document.getElementById('nlWhatsapp');
            const nlWhatsappContainer = document.getElementById('nlWhatsappContainer');

            if (nlWantsWhatsapp && nlWhatsappContainer && nlWhatsapp) {
                nlWantsWhatsapp.addEventListener('change', () => {
                    if (nlWantsWhatsapp.checked) {
                        nlWhatsappContainer.style.display = 'block';
                        nlWhatsapp.required = true;
                    } else {
                        nlWhatsappContainer.style.display = 'none';
                        nlWhatsapp.required = false;
                    }
                });
            }

            DOM.newsletterForm.addEventListener('submit', NewsletterModule.processSubmissionPipeline);
        },
        processSubmissionPipeline: async (e) => {
            e.preventDefault();
            const inputField = DOM.newsletterForm.querySelector('input[type="email"]') || document.getElementById('newsletterEmail');
            
            if (!inputField) return;
            const value = inputField.value.trim();

            const regexValidationEvaluator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!value) {
                ToastSystem.show("Please enter your email address.");
                inputField.focus();
                return;
            }

            if (!regexValidationEvaluator.test(value)) {
                ToastSystem.show("Please enter a valid email address.");
                inputField.focus();
                return;
            }

            const nlWantsWhatsapp = document.getElementById('nlWantsWhatsapp');
            const nlWhatsapp = document.getElementById('nlWhatsapp');
            const wants_whatsapp = nlWantsWhatsapp ? nlWantsWhatsapp.checked : false;
            const whatsapp_number = nlWhatsapp ? nlWhatsapp.value.trim() : null;

            const btn = DOM.newsletterForm.querySelector('button[type="submit"]');
            const originalText = btn ? btn.innerHTML : '';
            if (btn) {
                btn.innerHTML = 'Requesting VIP Invitation...';
                btn.disabled = true;
            }

            try {
                // Assume CONFIG is loaded globally
                const apiUrl = window.CONFIG ? window.CONFIG.API.NEWSLETTER : 'http://localhost:8000/api/newsletter/subscribe';
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: value,
                        wants_whatsapp: wants_whatsapp,
                        whatsapp_number: whatsapp_number
                    })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    ToastSystem.show(data.message || "Welcome! Check your inbox for updates.");
                    inputField.value = '';
                    inputField.blur();
                    if (btn) {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                } else {
                    ToastSystem.show(data.detail || data.message || "Something went wrong. Please try again.");
                }
            } catch (err) {
                console.error('Newsletter subscribe error:', err);
                ToastSystem.show("Could not connect to the server. Please try again later.");
            }
        }
    };

    // Feature 14: Scroll State Window Boundary Interceptor Configuration
    const NavbarScrollModule = {
        init: () => {
            if (!DOM.navbar) return;
            // Native micro-optimized throttling mechanism layer execution
            window.addEventListener('scroll', NavbarScrollModule.evaluateWindowScrollMetrics, { passive: true });
            NavbarScrollModule.evaluateWindowScrollMetrics();
        },
        evaluateWindowScrollMetrics: () => {
            if (window.scrollY > 40) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }
        }
    };

    // Feature 15: Map Engine Lifecycle Deferral Engine Mockup
    const MapEngineModule = {
        init: () => {
            if (!DOM.venueMap) return;
            
            setTimeout(() => {
                Utils.removeSkeletonLoaders(DOM.venueMap);
                
                const canvasBox = DOM.venueMap.querySelector('.MapFallbackPlaceholderGraphic') || DOM.venueMap;
                canvasBox.innerHTML = `
                    <div style="text-align: center; color: #666666; font-family: 'Plus Jakarta Sans', sans-serif;">
                        <i class="fa-solid fa-map-location-dot" style="font-size: 2.5rem; color: #C79A2B; margin-bottom: 1rem; display: block;"></i>
                        <span style="font-weight: 600; font-size: 1.1rem; color: #1F1F1F;">Interactive Map Coming Soon</span>
                        <p style="font-size: 0.85rem; color: #666666; margin-top: 0.25rem;">Spatial architectural vector processing layers are being synchronized.</p>
                    </div>
                `;
            }, 2000);
        }
    };

    // Feature 13: Viewport Dynamic Reveal Pipeline Interceptor
    const ViewportRevealModule = {
        init: () => {
            if (!('IntersectionObserver' in window)) {
                // Instantly force reveal elements upon older legacy clients fallback mapping
                DOM.revealNodes.forEach(node => node.classList.add('visible'));
                return;
            }

            const activeObserverOptions = {
                root: null,
                threshold: 0.08,
                rootMargin: '0px 0px -40px 0px'
            };

            const processIntersectionPipeline = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Micro-animations hooks integration sequence trigger
                        if (entry.target.classList.contains('interaction-reveal-node')) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                        observer.unobserve(entry.target);
                    }
                });
            };

            const coreObserverInstance = new IntersectionObserver(processIntersectionPipeline, activeObserverOptions);
            
            DOM.revealNodes.forEach(node => {
                // Ensure default inline preparation state variables
                if(node.classList.contains('interaction-reveal-node')) {
                    Object.assign(node.style, {
                        opacity: '0',
                        transform: 'translateY(30px)',
                        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    });
                }
                coreObserverInstance.observe(node);
            });
        }
    };

    // ==========================================
    // Dynamic Event Data Fetcher
    // ==========================================
    const CategoryImages = {
        'Music': [
            'Concert_crowd_at_sunset.webp', 'A_R__Rahman_Live_Symphony_Arena_Tour.webp', 
            'A_R__Rahman_Live_Symphony_Orchestra.webp', 'Sufi_Symphony_Night.webp', 'Sunburn_Festival_Goa_2026.webp'
        ],
        'Cultural': [
            'Kathak_Confluence_Stage.webp', 'Grand_Courtyard_Setup.webp',
            'Khajuraho_Classical_Dance_Soiree.webp', 'Traditional_Block_Printing___Indigo_Dye_Workshop.webp', 'Dev_Deepawali_Infinite_Lights_Cruise.webp'
        ],
        'Literature': [
            'Jaipur_Literature_Durbar_Banquet.webp', 'Jaipur_Literature_Festival_2027_Pre_Pass.webp',
            'Old_Delhi_Heritage_Breakfast_Masterclass.webp'
        ],
        'Pop Culture': [
            'Delhi_Comic_Con_2026.webp', 'Mumbai_International_Film_Retrospective.webp',
            'Vir_Das__Mind_Fool_India_Tour.webp'
        ],
        'Food': [
            'Assorted_authentic_Indian_street_food_delicacies.webp', 'Zomaland_Food___Culture_Festival.webp',
            'Coastal_Malvani_Seafood_Culinary_Exposition.webp', 'Royal_Awadhi_Gastronomy_Masterclass.webp'
        ],
        'Sports': [
            'Pro_Kabaddi_League_Championship_Finals.webp', 'ISL_Football_Derby_Clash.webp',
            'National_Cricket_Elite_League_Double_Header.webp'
        ],
        'Exhibition': [
            'Contemporary_Fine_Arts_Global_Biennale.webp', 'Global_FinTech_Disruption_Expo.webp',
            'Global_Healthcare_Innovation___Biotech_Summit.webp'
        ]
    };

    async function loadEventData() {
        const urlParams = new URLSearchParams(window.location.search);
        
        let ev = {
            id: urlParams.get('id') || 'EVB_2026_DEFAULT',
            title: urlParams.get('title'),
            image: urlParams.get('img'),
            location: urlParams.get('loc'),
            category: "Premium Experience",
            date: "Upcoming Season",
            price: 8500,
            description: "Experience the pinnacle of luxury and culture at this highly anticipated event, exclusively curated for connoisseurs."
        };

        // If we didn't get title/image from URL, try the backend as a fallback
        if (!ev.title) {
            try {
                const res = await fetch(`${CONFIG.API.EVENTS}/${ev.id}`);
                if (res.ok) {
                    const backendEv = await res.json();
                    ev = { ...ev, ...backendEv };
                } else {
                    // Fallback defaults
                    ev.title = "Exclusive Heritage Event";
                    ev.location = "India";
                    ev.image = Data.FallbackImage;
                }
            } catch (e) {
                console.error("Failed to load event data:", e);
                ev.title = "Exclusive Heritage Event";
                ev.location = "India";
                ev.image = Data.FallbackImage;
            }
        }

        State.eventId = ev.id;
        
        // Format price Helper
        const formatPrice = (amount) => {
                    if (!amount) return "₹0";
                    if (typeof amount === 'string') return amount;
                    return new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0
                    }).format(amount);
                };

                const titleEl = document.getElementById('dynamic-event-title');
                if (titleEl) titleEl.textContent = ev.title;
                document.title = `${ev.title} | Eventra Bharat`;
                
                const locEl = document.getElementById('dynamic-event-location');
                if (locEl && ev.location) locEl.textContent = ev.location;

                const specLocEl = document.getElementById('dynamic-spec-location');
                if (specLocEl && ev.location) specLocEl.textContent = ev.location;

                const dateEl = document.getElementById('dynamic-event-date');
                if (dateEl && ev.date) dateEl.textContent = ev.date;

                const specDateEl = document.getElementById('dynamic-spec-date');
                if (specDateEl && ev.date) specDateEl.textContent = ev.date;

                const catEl = document.getElementById('dynamic-event-category');
                if (catEl && ev.category) catEl.textContent = ev.category;
                
                const heroImg = document.getElementById('dynamic-event-image');
                if (heroImg && ev.image) heroImg.src = ev.image;

                const priceEl = document.getElementById('dynamic-event-price');
                if (priceEl && ev.price) priceEl.innerHTML = `${formatPrice(ev.price)} <span class="PriceSuffixUnit">/ Guest</span>`;
                
                const descEl = document.getElementById('dynamic-event-description');
                if (descEl && ev.description) {
                    descEl.innerHTML = `<p class="LeadParagraphText">${ev.description}</p>`;
                }

                // Update ticket pricing structure based on event base price
                if (ev.price) {
                    let baseNumeric = typeof ev.price === 'string' ? parseInt(ev.price.replace(/[^\d]/g, ''), 10) : ev.price;
                    if (!isNaN(baseNumeric)) {
                        Data.TicketPricing = {
                            'imperial_4day': { price: baseNumeric, label: 'Standard Pass' },
                            'royal_vip_4day': { price: baseNumeric * 2.5, label: 'VIP Pass' },
                            'connoisseur_single_day': { price: Math.floor(baseNumeric * 0.4), label: 'Single Day Pass' }
                        };
                        const widgetPrice = document.getElementById('dynamic-widget-price');
                        if (widgetPrice) widgetPrice.textContent = formatPrice(baseNumeric);

                        if (DOM.ticketTypeSelect) {
                            DOM.ticketTypeSelect.innerHTML = '';
                            for (const [key, config] of Object.entries(Data.TicketPricing)) {
                                const option = document.createElement('option');
                                option.value = key;
                                option.textContent = `${config.label} (${formatPrice(config.price)})`;
                                DOM.ticketTypeSelect.appendChild(option);
                            }
                        }
                    }
                }
                
                const catImages = CategoryImages[ev.category] || CategoryImages['Cultural'];
                Data.Gallery = [];
                if (ev.image) {
                    Data.Gallery.push({ image: ev.image, title: ev.title + ' Cover', alt: ev.title });
                }
                catImages.forEach((img, index) => {
                    if(Data.Gallery.length < 8) {
                        Data.Gallery.push({
                            image: `../assets/images/dynamic/${img}`,
                            title: `${ev.category || 'Event'} Visual ${index + 1}`,
                            alt: `${ev.title} related visual`
                        });
                    }
                });

    }

    // ==========================================
    // System Lifecycle Bootstrap Orchestrator
    // ==========================================
    const MainSystemBootstrapLifecycleOrchestrator = async () => {
        await loadEventData();

        // Core Dynamic Data Compilations Injection Sequences
        GalleryModule.render();
        TimelineModule.render();
        ReviewsModule.render();
        RelatedEventsModule.render();

        // Operational Workflow Pipelines Initializations
        BookingModule.init();
        WishlistModule.init();
        ShareModule.init();
        NavigationScrollModule.init();
        AccordionModule.init();
        NewsletterModule.init();
        NavbarScrollModule.init();
        MapEngineModule.init();

        // Architectural Viewport Interceptors Execution (Fires last to snap dynamic layouts accurately)
        setTimeout(() => {
            ViewportRevealModule.init();
        }, 100);
    };

    // Safety Interceptor Context Evaluator checking DOM state bindings
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', MainSystemBootstrapLifecycleOrchestrator);
    } else {
        MainSystemBootstrapLifecycleOrchestrator();
    }
})();
