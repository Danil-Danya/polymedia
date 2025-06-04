const openMenu = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu-drop');
const mobileMenuTop = document.querySelector('.header__top');
if (openMenu && mobileMenu && mobileMenuTop) {
  openMenu.addEventListener('click', () => {
    if (mobileMenu.classList.contains('header__drop--open')) {
      mobileMenu.classList.remove('header__drop--open');
      mobileMenuTop.classList.remove('header__top--open');
      document.body.classList.remove('no-overflow');
    } else {
      mobileMenu.classList.add('header__drop--open');
      mobileMenuTop.classList.add('header__top--open');
      document.body.classList.add('no-overflow');
    }
  });
}

// инпуты с флоат лейблом
const inputs = document.querySelectorAll('.form__input');
if (inputs) {
    inputs.forEach(function(input) {
        let parent = input.parentElement;
        input.addEventListener('focus', function() {
            parent.classList.add('form__item--active');
        });
        input.addEventListener('blur', function() {
            if(!this.value) {
                parent.classList.remove('form__item--active');
            }
        });
    });
}

// модальные окона в каталоге 
const openCatalogModal = document.querySelectorAll('.open-modal');
if (openCatalogModal) {
  openCatalogModal.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.dataset.id;
      const modalBlock = document.getElementById(modalId);
      if (modalBlock) {
        modalBlock.classList.add('filter-modal--open');
        document.body.classList.add('modal-open');
      }
    });
  });
}
const closeCatalogModal = document.querySelectorAll('.filter-modal__close');
if (closeCatalogModal) {
  closeCatalogModal.forEach(btn => {
    btn.addEventListener('click', function() {
      const modalBlock = this.closest('.filter-modal');
      if (modalBlock) {
        modalBlock.classList.remove('filter-modal--open');
        document.body.classList.remove('modal-open');
      }
    });
  });
}
// дроп сортировки 
const sortOpen = document.querySelector('.catalog__sort-btn');
const sortBlock = document.querySelector('.catalog__sort-block');
if (sortOpen && sortBlock) {
  sortOpen.addEventListener('click', function() {
    sortBlock.classList.add('catalog__sort-block--open');
  });
  sortBlock.addEventListener('mouseleave', function() {
    sortBlock.classList.remove('catalog__sort-block--open');
  });
}
// переключение внешнего вида списка
// todo: запись в куки внешнего вида
const listSwitch = document.querySelectorAll('.catalog__change-view');
const catalogList = document.querySelector('.catalog__items');
if (listSwitch && catalogList) {
  listSwitch.forEach(btn => {
    btn.addEventListener('click', function() {
      const thisBtn = this;
      const blockClass = 'catalog__items--'+thisBtn.dataset.type;
      console.log(catalogList.classList);
      if (catalogList.classList.length > 1) {
        catalogList.classList.forEach(item => {
          if (item !== blockClass && item !== 'catalog__items') {
            catalogList.classList.remove(item);
          }
        });
      }
      catalogList.classList.add(blockClass);
      listSwitch.forEach(item => {
        if (item !== thisBtn) {
          item.disabled = false;
        }
      });
      thisBtn.disabled = true;
    });
  });
}

// открытие на мобильном полных блоков
const detailShowMore = document.querySelectorAll('.catalog-detail__more');
if (detailShowMore) {
  detailShowMore.forEach(btn => {
    btn.addEventListener('click', function() {
      const parentBlock = this.closest('.catalog-detail__block');
      if (parentBlock) {
        parentBlock.classList.add('catalog-detail__block--full');
        parentBlock.scrollIntoView({behavior: "smooth", block: "start"});
        this.style.display = 'none';
      }
    });
  });
}
// в сравнении для мобильных открывать второй попап для категорий
const compareCategoryBtn = document.querySelectorAll('.compare__category-bth');
const compareCategoryModal = document.querySelector('#change.compare__sort');
if (compareCategoryBtn && compareCategoryModal) {
  compareCategoryBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      compareCategoryModal.classList.add('filter-modal--open');
      document.body.classList.add('modal-open');
    });
  });
}

// показать полный текст на детальной странице прокта для мобилы
const showProjectText = document.querySelector('.project-detail__more');
const blockProjectText = document.querySelector('.project-detail__text');
if (showProjectText && blockProjectText) {
  showProjectText.addEventListener('click', function() {
    this.style.display = 'none';
    blockProjectText.classList.add('project-detail__text--full');
  });
}

// запуск видео 
// у кнопки должны быть 2 data аттребута data-video это id/символьный код видео из ссылки и data-platform видеохостинг, где видео распологиется. Пока здесь вставка для ютуба, вк и рутуба
const startVideoBtn = document.querySelectorAll('.video__btn');
if (startVideoBtn) {
  startVideoBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      const thisBtn = this;
      const videoId = thisBtn.dataset.video;
      const platform = thisBtn.dataset.platform;
      const parent = thisBtn.closest('.video');
      const videoContainer = parent.querySelector('.video__container');
      if (videoContainer && videoId) {
        let videoUrl;
        switch (platform) {
          case 'youtube':
            videoUrl = 'https://www.youtube.com/embed/'+videoId+'?autoplay=1';
            break;
          case 'vk':
            if (vk.indexOf("video") > -1) {
              vk = vk.replace("video", "");
            }
            const vkIds = vk.split('_');
            videoUrl = 'https://vk.com/video_ext.php?oid='+vkIds[0]+'&id='+vkIds[1]+'&hd=2';
            break;
          case 'rutube':
            videoUrl = 'https://rutube.ru/play/embed/'+videoId+'/';
            break;
        }
        if (videoUrl) {
          const iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'clipboard-write; autoplay');
            thisBtn.style.display = 'none';
            videoContainer.innerHTML = '';
            videoContainer.classList.add('video__container--play');
            videoContainer.appendChild(iframe);
        }
      }
    });
  });
}

// скопировать тест из инпута (который поделиться ссылкой)
const copyBtn = document.querySelector('.share__btn');
if (copyBtn) {
    copyBtn.addEventListener('click', function() {
        let copyInput = this.parentElement.querySelector('.share__input');
        let text = copyInput.value;
        copyInput.select();
        if (navigator.clipboard && window.isSecureContext) {
            copyInput.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(text);
        } else {
            new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej();
            }).then();
        }
    });
}

// список емейлов в контактах
const contactsMore = document.querySelector('.contacts-list__more');
const contactsMoreWrap = document.querySelector('.contacts-list__list');
if (contactsMore && contactsMoreWrap) {
  contactsMore.addEventListener('click', function() {
    contactsMoreWrap.classList.add('contacts-list__list--full'); 
    this.style.display = 'none';
  });
}

window.addEventListener('load', function() {
  if (typeof Swiper !== 'undefined') {
    // слайдер на главной
    const heroPrevBtn = document.querySelector('.hero__btn--prev');
    const heroNextBtn = document.querySelector('.hero__btn--next');
    const swiperHero = new Swiper('.hero__carousel', {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 0,
      loop: true,
      freeMode: false,
      centeredSlides: true,
      navigation: {
          nextEl: '.hero__btn--next',
          prevEl: '.hero__btn--prev',
      },
      pagination: {
        el: ".hero__pagination"
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    });
    swiperHero.on('slideChangeTransitionEnd', (evt) => {
      const index = evt.activeIndex; 
      let indexPrev = index-1;
      let indexNext = index+1;
      if (indexPrev < 0) {
        indexPrev = evt.slides.length - 3;
      }
      if (indexNext >= evt.slides.length) {
        indexNext = 2;
      }
      const prevItem = evt.slides[indexPrev];
      const nextItem = evt.slides[indexNext];
      if (heroPrevBtn && prevItem) {
        const title = prevItem.querySelector('.hero__title');
        const img = prevItem.querySelector('.hero__img');
        if (title) {
          heroPrevBtn.querySelector('.hero__btn-name span').innerHTML = title.innerHTML;
        }
        if (img) {
          heroPrevBtn.querySelector('.hero__btn-pic img').src = img.dataset.img;
        }
      }
      if (heroNextBtn && nextItem) {
        const title = nextItem.querySelector('.hero__title');
        const img = nextItem.querySelector('.hero__img');
        if (title) {
          heroNextBtn.querySelector('.hero__btn-name span').innerHTML = title.innerHTML;
        }
        if (img) {
          heroNextBtn.querySelector('.hero__btn-pic img').src = img.dataset.img;
        }
      }
    });
    // Новости
    if (window.innerWidth < 768) {
      const swiperMainNews = new Swiper('.news-main__carousel', {
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 0,
        loop: false,
        freeMode: false,
        centeredSlides: true,
        navigation: false,
        pagination: false
      });
    }
    // слайдер каталог баннер
    const swiperCatalogBannerMob = new Swiper('.catalog-banner__slider--mob', {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 0,
      loop: true,
      freeMode: false,
      centeredSlides: true,
      pagination: {
        el: ".catalog-banner__slider--mob .catalog-banner__slider-nav"
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    });
    const swiperCatalogBanner = new Swiper('.catalog-banner__slider--desk', {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 0,
      loop: true,
      freeMode: false,
      centeredSlides: true,
      direction: 'vertical',
      pagination: {
        el: ".catalog-banner__slider--desk .catalog-banner__slider-nav"
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
    });
    // слайдер каталог левый блок
    const swiperCatalogLeft = new Swiper('.catalog__left-banner .swiper', {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 0,
      loop: true,
      freeMode: false,
      centeredSlides: true,
      pagination: {
        el: ".catalog__left-nav"
      }
    });
    // слайдер каталог Вы смотрели и подобные (переделать на foreach (?) если слайдеров несколько)
    const swiperCatalogViewed = new Swiper('.catalog-slider__carousel', {
      grabCursor: true,
      loop: false,
      freeMode: false,
      navigation: {
        nextEl: '.catalog-slider__button--next',
        prevEl: '.catalog-slider__button--prev',
      },
      spaceBetween: 30,
      pagination: false,
      breakpoints: {
        320: {
          centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 0,
        },
        500: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1441: {
          slidesPerView: 4,
          spaceBetween: 30,
        }
      }
    });
    // слайдер сравнение
    const swiperCompare = new Swiper('.compare__slider .swiper', {
      grabCursor: true,
      loop: false,
      freeMode: false,
      navigation: {
        nextEl: '.compare__slider-button--next',
        prevEl: '.compare__slider-button--prev',
      },
      spaceBetween: 0,
      pagination: false,
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        }
      }
    });
  }
  // слайдер с thumbами (детальна каталога, детальная новостей, детальная проектов)
  const swiperDetailThumb = new Swiper('.slider-with-thumb__slider-thumb .swiper', {
    slidesPerView: 6,
    grabCursor: true,
    spaceBetween: 15,
    loop: false,
    freeMode: false,
    centeredSlides: false,
    navigation: {
      nextEl: '.slider-with-thumb__slider-btn--next',
      prevEl: '.slider-with-thumb__slider-btn--prev',
    },
  });
  const swiperDetailBig = new Swiper('.slider-with-thumb__slider-big.swiper', {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 0,
    loop: true,
    freeMode: false,
    centeredSlides: true,
    pagination: {
      el: ".slider-with-thumb__nav"
    },
    thumbs: {
      swiper: swiperDetailThumb
  },
  });
  // блок Направления
  if (window.innerWidth >= 768) {
    const fieldsLinks = document.querySelectorAll('.fields--desktop a.fields__item');
    const fieldsBlocks = document.querySelectorAll('.fields--desktop .fields__block');
    const fieldsList = document.querySelector('.fields--desktop ul.fields__items');
    const fieldsRightBlock = document.querySelector('.fields--desktop .fields__right');
    if (fieldsLinks && fieldsBlocks && fieldsList && fieldsRightBlock) {
      const viewportHeight = window.innerHeight;
      const part = viewportHeight/100*40;
      const parentPosition = fieldsRightBlock.getBoundingClientRect().top + window.scrollY;
      let isScrolling = false;
      document.addEventListener('scroll', (e) => {
        if (!isScrolling) {
          isScrolling = true;
          requestAnimationFrame(() => {
            fieldsBlocks.forEach((item, index) => {
              const position = item.getBoundingClientRect();
              if (position.top < part && position.top > -30) {
                const link = fieldsLinks[index];
                if (link && !link.classList.contains('fields__item--active')) {
                  window.scrollTo(0, item.offsetTop+parentPosition);
                  fieldsLinks.forEach(linkItem => {
                    if (linkItem !== link) {
                      linkItem.classList.remove('fields__item--active');
                    }
                  })
                  link.classList.add('fields__item--active');
                  moveTag(link.offsetTop, link.offsetHeight);
                }
              }
            });
            isScrolling = false;
          });
        }
      });

      const fieldsLinkActive = document.querySelector('.fields--desktop a.fields__item--active');
      if (fieldsLinkActive) {
        moveTag(fieldsLinkActive.offsetTop, fieldsLinkActive.offsetHeight);
      }
      function moveTag(top, height) {
        fieldsList.style.setProperty('--top', top+'px');
        fieldsList.style.setProperty('--height', height+'px');
      }
    }
  }
  // меню на детальной странице каталога
  // анимация меню
  const navLinks = document.querySelectorAll('.inner-nav__btn');
  const navList = document.querySelector('ul.inner-nav__list');
  if (navLinks && navList) {
    navLinks.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        navLinks.forEach(item => {
          item.classList.remove('inner-nav__btn--active');
        });
        this.classList.add('inner-nav__btn--active');
        moveTagNav(this.offsetLeft, this.offsetWidth);
      });
    });

    const fieldsLinkActive = document.querySelector('.inner-nav__btn--active');
    if (fieldsLinkActive) {
      moveTagNav(fieldsLinkActive.offsetLeft, fieldsLinkActive.offsetWidth);
    }
    function moveTagNav(left, width) {
      left--;
      width++;
      navList.style.setProperty('--left', left+'px');
      navList.style.setProperty('--width', width+'px');
    }
  }
  // работа переключения вкладок
  const catalogNavLinks = document.querySelectorAll('.catalog-detail__nav-btn');
  const catalogTabs = document.querySelectorAll('.catalog-detail__block');
  if (catalogNavLinks && catalogTabs) {
    catalogNavLinks.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        const curLink = this;
        if (window.innerWidth >= 768) {
          e.defaultPrevented;
          const blockId = curLink.dataset.href;
          catalogTabs.forEach(block => {
            if (block.id === blockId) {
              block.classList.add('catalog-detail__block--open');
            } else {
              block.classList.remove('catalog-detail__block--open');
            }
          });
        }
      });
    });
  }

  // выровнять высоту колонок в сравнении 
  const compareRowAside = document.querySelectorAll('.compare__aside .compare__row');
  const compareColumnSlider = document.querySelectorAll('.compare__slider .swiper-slide');
  if (compareRowAside && compareColumnSlider) {
    let maxHeight = [];
    compareRowAside.forEach(item => {
      maxHeight.push(item.offsetHeight);
    });
    compareColumnSlider.forEach(column => {
      const columnRows = column.querySelectorAll('.compare__row');
      if (columnRows) {
        columnRows.forEach((item, index) => {
          if (maxHeight[index] && maxHeight[index] < item.offsetHeight) {
            maxHeight.splice(index, 1, item.offsetHeight);
          }
        });
      }
    });
    compareRowAside.forEach((item, index) => {
      item.style.height = maxHeight[index]+'px';
    });
    compareColumnSlider.forEach(column => {
      const columnRows = column.querySelectorAll('.compare__row');
      if (columnRows) {
        columnRows.forEach((item, index) => {
          item.style.height = maxHeight[index]+'px';
        });
      }
    });
  }
});