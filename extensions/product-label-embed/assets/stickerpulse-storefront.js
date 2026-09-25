/**
 * StickerPulse Storefront Badge Engine
 * High-precision product badge injector with strict tag filtering,
 * single-featured-image targeting, and duplicate icon prevention.
 */
(function () {
  'use strict';

  function initStickerPulse() {
    var data = window.StickerPulseData;
    if (!data || !data.labels || !Array.isArray(data.labels) || (data.settings && data.settings.enableLabels === false)) {
      return;
    }

    var labels = data.labels.filter(function (l) {
      return l.isActive !== false;
    });
    if (!labels.length) return;

    var isMobile = window.innerWidth <= 768;
    var pathname = (window.location.pathname || '').toLowerCase();
    var rawTemplate = (data.currentPage || '').toLowerCase();

    // Universal page detection
    var pageType = 'index';
    if (rawTemplate.indexOf('product') !== -1 || pathname.indexOf('/products/') !== -1) {
      pageType = 'product';
    } else if (rawTemplate.indexOf('collection') !== -1 || pathname.indexOf('/collections/') !== -1) {
      pageType = 'collection';
    } else if (rawTemplate.indexOf('search') !== -1 || pathname.indexOf('/search') !== -1) {
      pageType = 'search';
    } else if (rawTemplate.indexOf('cart') !== -1 || pathname.indexOf('/cart') !== -1) {
      pageType = 'cart';
    } else if (rawTemplate.indexOf('index') !== -1 || pathname === '/' || pathname === '') {
      pageType = 'index';
    } else {
      pageType = rawTemplate || 'index';
    }

    function isLabelAllowedOnPage(label) {
      if (!label) return false;
      if (!label.pageDisplay) return true;
      if (pageType === 'product' && label.pageDisplay.productPage === false) return false;
      if (pageType === 'collection' && label.pageDisplay.collectionPage === false) return false;
      if (pageType === 'index' && label.pageDisplay.homepage === false) return false;
      if (pageType === 'search' && label.pageDisplay.searchPage === false) return false;
      if (pageType === 'cart' && label.pageDisplay.cartPage === false) return false;

      if (label.deviceDisplay === 'desktop' && isMobile) return false;
      if (label.deviceDisplay === 'mobile' && !isMobile) return false;

      return true;
    }

    function extractProductContext(card, mediaContainer, titleContainer) {
      var context = { id: '', handle: '', tags: [] };
      var tagsMap = data.productTags || {};

      if (card) {
        if (card.dataset.productId) context.id = String(card.dataset.productId);
        if (card.dataset.productHandle) context.handle = String(card.dataset.productHandle);
        if (card.dataset.productTags) {
          context.tags = context.tags.concat(card.dataset.productTags.split(','));
        }
        if (card.dataset.tags) {
          context.tags = context.tags.concat(card.dataset.tags.split(','));
        }
      }

      var link = (card || mediaContainer || titleContainer || document).querySelector('a[href*="/products/"]');
      if (link && link.getAttribute('href')) {
        var href = link.getAttribute('href').split('?')[0];
        var parts = href.split('/products/');
        if (parts[1]) {
          context.handle = parts[1].replace(/\/$/, '');
        }
      }

      if (context.id && tagsMap[context.id] && Array.isArray(tagsMap[context.id])) {
        context.tags = context.tags.concat(tagsMap[context.id]);
      }
      if (context.handle && tagsMap[context.handle] && Array.isArray(tagsMap[context.handle])) {
        context.tags = context.tags.concat(tagsMap[context.handle]);
      }

      if (pageType === 'product' && data.currentProduct && Array.isArray(data.currentProduct.tags)) {
        context.tags = context.tags.concat(data.currentProduct.tags);
      }

      var cleanTags = [];
      context.tags.forEach(function (t) {
        if (typeof t === 'string') {
          var s = t.trim().toLowerCase();
          if (s && cleanTags.indexOf(s) === -1) cleanTags.push(s);
        }
      });
      context.tags = cleanTags;
      return context;
    }

    function isLabelAllowedForProduct(label, card, mediaContainer, titleContainer) {
      if (!label) return false;
      if (!isLabelAllowedOnPage(label)) return false;

      // Strict Tag-based Product Filtering
      if (label.targetMode === 'tags' && label.targetTags) {
        var targetList = String(label.targetTags)
          .split(',')
          .map(function (t) { return t.trim().toLowerCase(); })
          .filter(Boolean);

        if (targetList.length > 0) {
          var ctx = extractProductContext(card, mediaContainer, titleContainer);
          var hasTagMatch = ctx.tags.some(function (pTag) {
            return targetList.some(function (tTag) {
              return pTag === tTag || pTag.indexOf(tTag) !== -1 || tTag.indexOf(pTag) !== -1;
            });
          });

          if (!hasTagMatch && card) {
            var cardAttr = (card.className + ' ' + (card.dataset.tags || '') + ' ' + (card.dataset.productTags || '')).toLowerCase();
            hasTagMatch = targetList.some(function (tTag) {
              return cardAttr.indexOf(tTag) !== -1;
            });
          }

          if (!hasTagMatch) {
            return false;
          }
        }
      }

      return true;
    }

    function createBadgeElement(label, isInside, isSecond) {
      isSecond = Boolean(isSecond);
      var isImg = isSecond ? label.secondLabelType === 'image' : label.type === 'image';

      var badge = document.createElement(isImg ? 'img' : 'div');
      badge.className = 'stickerpulse-badge-container ' + (isInside ? 'stickerpulse-badge-inside' : 'stickerpulse-badge-outside');

      var shape = isSecond ? (label.secondSelectedShape || 'capsule-full') : (label.selectedShape || 'capsule-full');
      if (shape && !isImg) {
        badge.classList.add('sp-shape-' + shape);
      }

      var hasBorder = isSecond ? label.secondHasBorder : label.hasBorder;
      if (hasBorder) {
        var bColor = isSecond ? label.secondBorderColor : label.borderColor;
        var bWidth = isSecond ? label.secondBorderWidth : label.borderWidth;
        badge.style.border = (bWidth || 1) + 'px solid ' + (bColor || '#000000');
      }

      var hasRound = isSecond ? label.secondHasRoundCorner : label.hasRoundCorner;
      if (hasRound) {
        var radius = isSecond ? label.secondBorderRadius : label.borderRadius;
        badge.style.borderRadius = (radius || 6) + 'px';
        badge.style.overflow = 'hidden';
      }

      if (isImg) {
        badge.src = isSecond ? label.secondSelectedImageUrl : label.selectedImageUrl;
        badge.alt = 'Product Badge';
        var size = isSecond ? (label.secondImageSize || 26) : (label.imageSize || 26);
        var unit = isSecond ? (label.secondImageUnit || '%') : (label.imageUnit || '%');
        badge.style.width = unit === '%' ? size + '%' : size + 'px';
        badge.style.maxWidth = '90%';
        badge.style.objectFit = (isSecond ? label.secondLockAspectRatio : label.lockAspectRatio) ? 'contain' : 'fill';
      } else {
        var rawText = isSecond ? (label.secondTextContent || 'SALE') : (label.textContent || 'SALE');
        var icon = isSecond ? label.secondBadgeIcon : label.badgeIcon;
        var iconPos = isSecond ? label.secondIconPosition : label.iconPosition;

        // Prevent duplicate icon if text already contains the emoji
        var cleanText = rawText;
        if (icon && cleanText) {
          if (cleanText.indexOf(icon) === 0) {
            cleanText = cleanText.substring(icon.length).trim();
          } else if (cleanText.indexOf(icon) !== -1) {
            cleanText = cleanText.replace(icon, '').trim();
          }
        }

        var html = '';
        if (icon && iconPos === 'left') html += '<span style="margin-right: 4px;">' + icon + '</span>';
        html += '<span>' + cleanText + '</span>';
        if (icon && iconPos === 'right') html += '<span style="margin-left: 4px;">' + icon + '</span>';
        badge.innerHTML = html;

        badge.style.backgroundColor = isSecond ? (label.secondBgColor || '#10b981') : (label.bgColor || '#059669');
        badge.style.color = isSecond ? (label.secondTextColor || '#ffffff') : (label.textColor || '#ffffff');
        badge.style.fontFamily = (isSecond ? label.secondFontFamily : label.fontFamily) || 'inherit';
        badge.style.fontWeight = (isSecond ? label.secondIsBold : label.isBold) ? '700' : '400';
        badge.style.fontStyle = (isSecond ? label.secondIsItalic : label.isItalic) ? 'italic' : 'normal';
        badge.style.textDecoration = (isSecond ? label.secondIsUnderline : label.isUnderline) ? 'underline' : 'none';
        badge.style.textTransform = (isSecond ? label.secondIsUppercase : label.isUppercase) ? 'uppercase' : 'none';
        badge.style.letterSpacing = ((isSecond ? label.secondLetterSpacing : label.letterSpacing) || 0) + 'px';

        var textSize = isSecond ? (label.secondTextSizePercent || 44) : (label.textSizePercent || 44);
        badge.style.fontSize = Math.max(10, Math.round(textSize * 0.28)) + 'px';

        var padX = Math.max(6, Math.round(((isSecond ? label.secondWidthPercent : label.widthPercent) || 26) * 0.35));
        var padY = Math.max(4, Math.round(((isSecond ? label.secondHeightPercent : label.heightPercent) || 12) * 0.35));
        badge.style.padding = padY + 'px ' + padX + 'px';
      }

      if (isInside) {
        var anchor = (isSecond ? label.secondAnchor : label.anchor) || 'top-left';
        var offX = (isSecond ? label.secondOffsetX : label.offsetX) || 0;
        var offY = (isSecond ? label.secondOffsetY : label.offsetY) || 0;

        if (anchor.indexOf('top') === 0) badge.style.top = (8 + offY) + 'px';
        if (anchor.indexOf('bottom') === 0) badge.style.bottom = (8 - offY) + 'px';
        if (anchor.indexOf('middle') === 0) {
          badge.style.top = 'calc(50% + ' + offY + 'px)';
          badge.style.transform = 'translateY(-50%)';
        }

        if (anchor.indexOf('left') !== -1) badge.style.left = (8 + offX) + 'px';
        if (anchor.indexOf('right') !== -1) badge.style.right = (8 - offX) + 'px';
        if (anchor.indexOf('center') !== -1) {
          badge.style.left = 'calc(50% + ' + offX + 'px)';
          badge.style.transform = anchor.indexOf('middle') === 0 ? 'translate(-50%, -50%)' : 'translateX(-50%)';
        }
      }

      return badge;
    }

    function applyBadgesToContainer(mediaContainer, titleContainer, uniqueKey, card) {
      if (!mediaContainer && !titleContainer) return;
      if (mediaContainer && mediaContainer.dataset.stickerpulseBound) return;
      if (titleContainer && titleContainer.dataset.stickerpulseBound) return;

      var applied = false;

      labels.forEach(function (label) {
        if (!isLabelAllowedForProduct(label, card, mediaContainer, titleContainer)) return;

        // 1. Primary Badge
        if (label.positionMode === 'inside' && mediaContainer) {
          var computedPos = window.getComputedStyle(mediaContainer).position;
          if (computedPos === 'static') {
            mediaContainer.style.position = 'relative';
          }
          mediaContainer.appendChild(createBadgeElement(label, true, false));
          applied = true;
        } else if (label.positionMode === 'outside' && titleContainer) {
          var wrap = document.createElement('div');
          var align = label.outsideAlignment || 'left';
          wrap.className = 'stickerpulse-badge-outside align-' + align;
          wrap.appendChild(createBadgeElement(label, false, false));
          titleContainer.parentNode.insertBefore(wrap, titleContainer.nextSibling);
          applied = true;
        }

        // 2. Secondary Badge
        if (label.showMultipleLabelsPreview) {
          if (label.secondPositionMode === 'inside' && mediaContainer) {
            var compPos2 = window.getComputedStyle(mediaContainer).position;
            if (compPos2 === 'static') {
              mediaContainer.style.position = 'relative';
            }
            mediaContainer.appendChild(createBadgeElement(label, true, true));
            applied = true;
          } else if (label.secondPositionMode === 'outside' && titleContainer) {
            var wrapSec = document.createElement('div');
            var alignSec = label.secondOutsideAlignment || 'left';
            wrapSec.className = 'stickerpulse-badge-outside align-' + alignSec;
            wrapSec.appendChild(createBadgeElement(label, false, true));
            titleContainer.parentNode.insertBefore(wrapSec, titleContainer.nextSibling);
            applied = true;
          }
        }
      });

      if (applied) {
        if (mediaContainer) mediaContainer.dataset.stickerpulseBound = uniqueKey;
        if (titleContainer) titleContainer.dataset.stickerpulseBound = uniqueKey;
      }
    }

    function scanAndApply() {
      // 1. Scan Standard Product Cards (Collections, Homepage Grid, Search Results)
      var CARD_SELECTORS = [
        '.card-wrapper',
        '.product-card-wrapper',
        '.card--product',
        '.card--standard',
        '.card--media',
        '.card.card--card',
        '.product-card',
        '.grid-view-item',
        '.product-item',
        '.product-grid-item',
        '[data-product-card]',
        '.featured-product'
      ];

      var MEDIA_SELECTORS = [
        '.card__inner',
        '.card__media',
        '.media',
        '.product-card__image-wrapper',
        '.product-item__image-wrapper',
        '.product-card__figure',
        '.aspect-ratio',
        '.image-wrap'
      ];

      var TITLE_SELECTORS = [
        '.card__heading',
        '.product-card__title',
        '.product-item__title',
        '.product-title',
        '.product__title',
        'h3.card__heading',
        'h1.product__title',
        '.title'
      ];

      document.querySelectorAll(CARD_SELECTORS.join(', ')).forEach(function (card, index) {
        if (card.dataset.spCardProcessed) return;
        card.dataset.spCardProcessed = 'true';

        var media = card.querySelector(MEDIA_SELECTORS.join(', '));
        var title = card.querySelector(TITLE_SELECTORS.join(', '));
        if (media || title) {
          applyBadgesToContainer(media, title, 'card-' + index, card);
        }
      });

      // 2. Scan Single Featured Hero / PDP Media Container (Target ONLY the primary main image)
      var HERO_SECTION_SELECTORS = [
        '[id*="pseo_product_hero"]',
        '[class*="pseo_product_hero"]',
        '[class*="pseo-product-hero"]',
        '[id*="product-hero"]',
        '[class*="product-hero"]',
        '.product__media-wrapper',
        '.product-single__photos',
        '.product__gallery'
      ];

      document.querySelectorAll(HERO_SECTION_SELECTORS.join(', ')).forEach(function (section, sIndex) {
        if (section.dataset.spHeroProcessed) return;
        section.dataset.spHeroProcessed = 'true';

        // Select ONLY the first/main primary media wrapper (ignore thumbnails and zoom popups)
        var heroMedia = section.querySelector(
          '.product__media-item:first-child .product__media, .product__media-item.is-active, .product__media:first-of-type, .swiper-slide-active .media, .slick-active .media, .media:first-of-type, picture:first-of-type, figure:first-of-type'
        ) || section.querySelector('.product__media, .media');

        if (!heroMedia) {
          var firstImg = section.querySelector('img');
          if (firstImg && firstImg.parentElement) {
            heroMedia = firstImg.parentElement;
          }
        }

        var heroTitle = section.querySelector('h1, h2, .product__title, [class*="title"], [class*="heading"]');
        if (!heroTitle) {
          var parentSection = section.closest('section') || section.parentElement;
          if (parentSection) {
            heroTitle = parentSection.querySelector('h1, h2, .product__title, [class*="title"]');
          }
        }

        if (heroMedia || heroTitle) {
          applyBadgesToContainer(heroMedia, heroTitle, 'hero-' + sIndex, section);
        }
      });
    }

    scanAndApply();

    [300, 800, 1500, 3000].forEach(function (delay) {
      setTimeout(scanAndApply, delay);
    });

    if (window.MutationObserver) {
      var observer = new MutationObserver(function () {
        scanAndApply();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    if (Boolean(window.Shopify && window.Shopify.designMode)) {
      [
        'shopify:section:load',
        'shopify:section:select',
        'shopify:section:deselect',
        'shopify:section:reorder',
        'shopify:block:select',
        'shopify:block:deselect'
      ].forEach(function (evt) {
        document.addEventListener(evt, scanAndApply);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickerPulse);
  } else {
    initStickerPulse();
  }
})();
