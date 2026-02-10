document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Functionality ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');

        let currentIndex = 0;

        const getSlidesPerView = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 4;
        };

        const updateCarousel = () => {
            const slidesPerView = getSlidesPerView();
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gap = 30;
            const moveAmount = (slideWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Disable buttons at ends
            if (prevButton) {
                prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';
            }

            const maxIndex = slides.length - slidesPerView;
            if (nextButton) {
                nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
                nextButton.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'all';
            }
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const slidesPerView = getSlidesPerView();
                if (currentIndex < slides.length - slidesPerView) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });

        // Initial check
        updateCarousel();
    }


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }

    // --- Cart Functionality (Simple) ---
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    if (cartBtns.length > 0 && cartCount) {
        cartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering card click
                count++;
                cartCount.textContent = count;

                const originalText = btn.textContent;
                btn.textContent = 'Added!';
                btn.style.backgroundColor = '#2C3E50';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 1000);
            });
        });
    }

    // --- Scroll to Top ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Account Modal ---
    const accountLink = document.querySelector('a[href="#account"]');
    const accountModal = document.getElementById('accountModal');

    if (accountLink && accountModal) {
        const closeAccountModal = accountModal.querySelector('.close-modal');

        accountLink.addEventListener('click', (e) => {
            e.preventDefault();
            accountModal.style.display = 'flex';
            setTimeout(() => {
                accountModal.classList.add('show');
            }, 10);
        });

        if (closeAccountModal) {
            closeAccountModal.addEventListener('click', () => {
                accountModal.classList.remove('show');
                setTimeout(() => {
                    accountModal.style.display = 'none';
                }, 300);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === accountModal) {
                accountModal.classList.remove('show');
                setTimeout(() => {
                    accountModal.style.display = 'none';
                }, 300);
            }
        });
    }

    // --- Dynamic Product Data ---
    const products = {
        'hairfall-shampoo': {
            title: "Curick Hair Shampoo – Conditioning",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/shampoo.jpg"],
            desc: "A luxurious, moisture-rich cleansing formula designed to gently cleanse while deeply nourishing and strengthening hair.",
            longDesc: `
                <div class="product-intro">
                    <h4>Product Introduction</h4>
                    <p>Curick Hair Shampoo – Conditioning is a luxurious, moisture-rich cleansing formula designed to gently cleanse while deeply nourishing and strengthening hair. Enriched with barrier-repair ceramides, proteins, and cold-pressed oils, it restores softness, smoothness, and manageability without weighing hair down.</p>
                </div>
                <div class="product-description-detail">
                    <h4>Product Description</h4>
                    <p>This advanced conditioning shampoo combines Ceramide NP, Hydrolyzed Keratin & Silk Protein, Cold-Pressed Argan Oil, Hyaluronic Acid to cleanse, repair, and protect damaged hair fibers. Ideal for daily use, it leaves hair visibly smoother, shinier, and healthier from root to tip.</p>
                </div>
                <div class="product-benefits">
                    <h4>Key Product Benefits</h4>
                    <ul class="benefit-list">
                        <li><i class="fas fa-check"></i> Gently cleanses while conditioning hair</li>
                        <li><i class="fas fa-check"></i> Repairs damaged & chemically treated hair</li>
                        <li><i class="fas fa-check"></i> Improves smoothness, shine & softness</li>
                        <li><i class="fas fa-check"></i> Reduces frizz & breakage</li>
                        <li><i class="fas fa-check"></i> Enhances manageability & silkiness</li>
                    </ul>
                </div>
            `,
            howToUse: `
                <div class="how-to-use-detail">
                    <h4>How to Use (Application)</h4>
                    <ol>
                        <li>Apply to wet hair and scalp.</li>
                        <li>Massage gently to create a rich lather.</li>
                        <li>Rinse thoroughly.</li>
                        <li>For best results, follow with Curick Hair Conditioner.</li>
                    </ol>
                </div>
                <div class="who-should-use">
                    <h4>Who Should Use</h4>
                    <ul>
                        <li>Dry & damaged hair</li>
                        <li>Frizzy, rough, or chemically treated hair</li>
                        <li>Daily shampoo users needing nourishment</li>
                    </ul>
                </div>
                <div class="suitable-hair">
                    <h4>Suitable Hair Type</h4>
                    <p><i class="fas fa-check"></i> Dry hair, Normal hair, Color-treated & chemically processed hair, Frizz-prone hair</p>
                </div>
            `,
            features: `
                <div class="product-features-detail">
                    <h4>Product Features</h4>
                    <ul>
                        <li>Conditioning-based cleansing system</li>
                        <li>Protein + ceramide repair technology</li>
                        <li>Salon-grade performance</li>
                        <li>Non-heavy, daily-use formula</li>
                        <li>Suitable for men & women</li>
                    </ul>
                </div>
                <div class="product-caution">
                    <h4>Caution</h4>
                    <ul>
                        <li>For external use only</li>
                        <li>Avoid contact with eyes</li>
                        <li>Patch test recommended before first use</li>
                        <li>Discontinue use if irritation occurs</li>
                    </ul>
                </div>
                <div class="storage-instructions">
                    <h4>Storage Instructions</h4>
                    <p>Store in a cool, dry place. Keep away from direct sunlight. Close cap tightly after use.</p>
                </div>
                <div class="product-positioning">
                    <h4>Product Positioning</h4>
                    <p><em>Premium Conditioning Shampoo | Repair & Smooth Technology | Professional Care</em></p>
                </div>
            `,
            rating: "(115 Reviews)",
            category: "Hair Care",
            ingredients: `
                <div class="ingredients-intro">
                    <p>Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Biotin, Saw Palmetto, Caffeine, Vitamin E, Argan Oil.</p>
                </div>
                <div class="ingredients-bioactive">
                    <h4>Key Bio-Active Ingredients & Benefits</h4>
                    <div class="ingredient-item">
                        <strong>Ceramide NP</strong>
                        <ul>
                            <li>Rebuilds damaged hair cuticle barrier</li>
                            <li>Reduces moisture loss</li>
                            <li>Improves hair strength & elasticity</li>
                        </ul>
                    </div>
                    <div class="ingredient-item">
                        <strong>Hydrolyzed Keratin</strong>
                        <ul>
                            <li>Repairs damaged hair structure</li>
                            <li>Enhances strength & resilience</li>
                            <li>Reduces breakage</li>
                        </ul>
                    </div>
                    <div class="ingredient-item">
                        <strong>Hydrolyzed Silk Protein</strong>
                        <ul>
                            <li>Provides silky smooth feel</li>
                            <li>Improves shine & softness</li>
                            <li>Enhances hair manageability</li>
                        </ul>
                    </div>
                    <div class="ingredient-item">
                        <strong>Argan Oil (Cold-Pressed)</strong>
                        <ul>
                            <li>Deep nourishment without greasiness</li>
                            <li>Adds natural shine</li>
                            <li>Protects against dryness & frizz</li>
                        </ul>
                    </div>
                    <div class="ingredient-item">
                        <strong>HYALURONIC ACID</strong>
                        <ul>
                            <li>Improves conditioning & detangling</li>
                            <li>Enhances wet and dry combability</li>
                        </ul>
                    </div>
                </div>
            `
        },
        'anti-acne-facewash': {
            title: "Anti Acne Foaming Face Wash",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/002-p1.jpg", "assets/2nd .jpeg"],
            desc: "Deeply cleanses and prevents breakouts in oily skin. The foaming action penetrates pores to remove excess oil and bacteria without over-drying.",
            rating: "(92 Reviews)",
            category: "Face Care",
            ingredients: "Salicylic Acid, Glycolic Acid, Neem Extract, Tea Tree Oil, Aloe Vera, Glycerin."
        },
        'sunscreen': {
            title: "Face & Body Sunscreen",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/003-p1.jpg", "assets/3rd.jpeg", "assets/3rd new.jpeg"],
            desc: "Broad spectrum SPF 50 protection with no white cast. A lightweight, non-greasy formula perfect for daily protection against UVA and UVB rays.",
            rating: "(140 Reviews)",
            category: "Body Care",
            ingredients: "Zinc Oxide, Titanium Dioxide, Avobenzone, Octisalate, Vitamin C, Green Tea Extract."
        },
        'brightening-serum': {
            title: "Brightening Face Serum",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/004-p1.jpg", "assets/CURICK- 30ML -p2.jpg"],
            desc: "Evens skin tone and boosts naturally healthy radiance. This high-potency serum fades dark spots and hyperpigmentation for a luminous complexion.",
            rating: "(210 Reviews)",
            category: "Face Care",
            ingredients: "Vitamin C (L-Ascorbic Acid), Niacinamide, Hyaluronic Acid, Ferulic Acid, Licorice Root Extract."
        },
        'anti-acne-serum': {
            title: "Anti Acne Face Serum",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/005-p1.jpg", "assets/CURICK- 30ML -p1.jpg"],
            desc: "Targets blemishes and controls excess oil production. formulated with powerful anti-inflammatory ingredients to calm redness and clear active acne.",
            rating: "(156 Reviews)",
            category: "Face Care",
            ingredients: "Salicylic Acid 2%, Zinc PCA, Centella Asiatica (Cica), Witch Hazel, Panthenol."
        },
        'hair-mask': {
            title: "Anti Hairfall Hair Mask",
            price: "₹599",
            originalPrice: "",
            discount: "",
            save: "",
            images: ["assets/hair-mask.jpg"],
            desc: "Deeply conditions and repairs cuticle for smoother hair. A restorative treatment that strengthens brittle strands and adds a brilliant shine.",
            rating: "(134 Reviews)",
            category: "Hair Care",
            ingredients: "Hyaluronic Acid, Ceramide NP, Hydrolyzed Keratin, Silk Protein, Argan Oil, Shea Butter, Vitamin E."
        }
    };


    // --- Product Page Logic ---
    // Check if we are on the product page by looking for the mainImage element
    const mainImage = document.getElementById('mainImage');

    if (mainImage) {
        // Parse URL Param
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const productData = products[productId] || products['hair-mask']; // Use hair-mask as default

        // Populate Data
        document.title = `${productData.title} | Curick`;
        document.querySelector('.product-title').textContent = productData.title;
        document.querySelector('.sale-price').textContent = productData.price;
        document.querySelector('.product-description').textContent = productData.desc;

        // Set Main Image
        const firstImage = productData.images[0];
        mainImage.src = firstImage;
        mainImage.alt = productData.title;

        // Generate Thumbnails
        const thumbList = document.querySelector('.thumbnail-list');
        if (thumbList) {
            thumbList.innerHTML = ''; // Clear existing
            productData.images.forEach((imgSrc, index) => {
                const thumbImg = document.createElement('img');
                thumbImg.src = imgSrc;
                thumbImg.alt = `${productData.title} View ${index + 1}`;
                thumbImg.className = index === 0 ? 'thumb active' : 'thumb';

                thumbImg.addEventListener('click', function () {
                    mainImage.src = this.src;
                    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });

                thumbList.appendChild(thumbImg);
            });
        }

        document.querySelector('.product-rating span').textContent = productData.rating;

        // Content Tabs
        const descTab = document.getElementById('desc');
        const ingrTab = document.getElementById('ingr');
        if (descTab) {
            let descContent = '';
            if (productData.longDesc) {
                descContent += productData.longDesc;
            } else {
                descContent += `<p>${productData.desc}</p>`;
            }

            if (productData.howToUse) {
                descContent += productData.howToUse;
            } else {
                descContent += `<p><strong>How to Use:</strong> Apply to target area daily for best results.</p>`;
            }

            if (productData.features) {
                descContent += productData.features;
            }

            descTab.innerHTML = descContent;
        }
        if (ingrTab) {
            if (productData.ingredients.includes('<')) {
                // If it looks like HTML
                ingrTab.innerHTML = productData.ingredients;
            } else {
                ingrTab.innerHTML = `<p>${productData.ingredients}</p>`;
            }
        }

        // Breadcrumbs
        const bcCategory = document.getElementById('breadcrumbCategory');
        const bcProduct = document.getElementById('breadcrumbProduct');
        if (bcCategory) bcCategory.textContent = productData.category;
        if (bcProduct) bcProduct.textContent = productData.title;

        // Handle Optional Price Fields
        const originalPriceEl = document.querySelector('.original-price');
        const discountBadgeEl = document.querySelector('.discount-badge');
        const saveTextEl = document.querySelector('.save-text');

        if (productData.originalPrice) {
            originalPriceEl.textContent = productData.originalPrice;
            originalPriceEl.style.display = 'inline';
            if (discountBadgeEl) {
                discountBadgeEl.textContent = productData.discount;
                discountBadgeEl.style.display = 'inline-block';
            }
            if (saveTextEl) {
                saveTextEl.textContent = productData.save;
                saveTextEl.style.display = 'block';
            }
        } else {
            if (originalPriceEl) originalPriceEl.style.display = 'none';
            if (discountBadgeEl) discountBadgeEl.style.display = 'none';
            if (saveTextEl) saveTextEl.style.display = 'none';
        }

        // Update Hidden Form Fields for WhatsApp
        const waProductInput = document.getElementById('waProduct');
        const waPriceInput = document.getElementById('waPrice');
        if (waProductInput) waProductInput.value = productData.title;
        if (waPriceInput) waPriceInput.value = productData.price.replace(/[^\d]/g, ''); // Extract number
    }

    // Quantity Selector
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) {
        const minusBtn = qtyInput.previousElementSibling;
        const plusBtn = qtyInput.nextElementSibling;

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
            });
        }
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                qtyInput.value = parseInt(qtyInput.value) + 1;
            });
        }
    }

    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = btn.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract ID from onclick or switch to data-tab
                // Cleaner approach: use onclick removal and listener add, BUT reusing existing onclick from HTML is fine if we respect it.
                // However, moving logic to JS means I should remove onclick from HTML.
                // Let's assume I will remove onclick in HTML and use data attributes or just ID map.
                // For now, let's keep the HTML onclick inline logic or replace it.
                // Re-writing logic to be pure JS listener:
                e.preventDefault(); // Stop default

                // My JS replacement logic below:
                /* 
                   Wait, I am replacing the HTML content in next step? 
                   If I leave HTML onclick="openTab(...)", I don't need this block.
                   But I said I'd move it to JS.
                   Let's stick to the plan: I will replace the HTML to remove onclicks.
                */
            });
        });
    }
    // Actually, for tabs, it's easier to expose a global function or attach listeners if I change HTML.
    // Let's expose the Product Page functions to window so the HTML can still call them IF I don't strip HTML clean yet.
    // maximize compatibility:
    window.changeImage = function (src) {
        if (mainImage) mainImage.src = src;
        document.querySelectorAll('.thumb').forEach(img => img.classList.remove('active'));
        if (event.target) event.target.classList.add('active');
    };

    window.incrementQty = function () {
        if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1;
    };

    window.decrementQty = function () {
        if (qtyInput && qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    };

    window.openTab = function (evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove('active');
        }
        tablinks = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.className += " active";
    };

    // WhatsApp Modal Logic (Exposed to window for HTML onclicks)
    const waModal = document.getElementById('whatsappModal');

    window.openWhatsAppModal = function () {
        if (waModal) {
            waModal.style.display = 'flex';
            setTimeout(() => waModal.classList.add('show'), 10);
        }
    };

    window.closeWhatsAppModal = function () {
        if (waModal) {
            waModal.classList.remove('show');
            setTimeout(() => waModal.style.display = 'none', 300);
        }
    };

    window.submitWhatsAppOrder = function (e) {
        e.preventDefault();

        const name = document.getElementById('waName').value;
        const phone = document.getElementById('waPhone').value;
        const address = document.getElementById('waAddress').value;
        const notes = document.getElementById('waNotes').value;
        const product = document.getElementById('waProduct').value;
        const price = document.getElementById('waPrice').value;
        const qty = document.getElementById('quantity').value;
        const sizeBtn = document.querySelector('.size-btn.active');
        const size = sizeBtn ? sizeBtn.textContent : 'N/A';

        const message = `🛍️ *NEW ORDER FROM CURICK WEBSITE*

📦 *Product Details:*
Product: ${product}
Price: ₹${price}
Quantity: ${qty}
Size/Variant: ${size}

👤 *Customer Details:*
Name: ${name}
Phone: ${phone}
Address: ${address}

💬 *Special Instructions:*
${notes}

---
Order placed on: ${new Date().toLocaleString()}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/919811594154?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
        window.closeWhatsAppModal();
    };

    // Size Selector Click
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- Announcement Bar Integration ---
    const announcementText = document.getElementById('announcementText');
    const prevBtn = document.getElementById('announcementPrev');
    const nextBtn = document.getElementById('announcementNext');

    const announcements = [
        "Trust Circle: Earn rewards on your skincare journey!",
        "Free Shipping on all orders over $50!",
        "New Arrivals: Check out our latest Summer Collection.",
        "Sign up now and get 10% off your first order!"
    ];

    let announcementIndex = 0;

    const updateAnnouncement = () => {
        if (!announcementText) return;
        announcementText.style.opacity = '0';
        setTimeout(() => {
            announcementText.textContent = announcements[announcementIndex];
            announcementText.style.opacity = '1';
        }, 200);
    };

    if (prevBtn && nextBtn && announcementText) {
        prevBtn.addEventListener('click', () => {
            announcementIndex--;
            if (announcementIndex < 0) {
                announcementIndex = announcements.length - 1;
            }
            updateAnnouncement();
        });

        nextBtn.addEventListener('click', () => {
            announcementIndex++;
            if (announcementIndex >= announcements.length) {
                announcementIndex = 0;
            }
            updateAnnouncement();
        });

        setInterval(() => {
            announcementIndex++;
            if (announcementIndex >= announcements.length) {
                announcementIndex = 0;
            }
            updateAnnouncement();
        }, 5000);
    }
});
