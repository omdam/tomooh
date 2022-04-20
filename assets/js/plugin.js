/********************************
 *
 * lazy load  *
 *
 ********************************/
lazyLoad();

function lazyLoad() {
    const images = document.querySelectorAll(".lazy-omd");

    const optionsLazyLoad = {
        //  rootMargin: '-50px',
        // threshold: 1
    };

    const imageObserver = new IntersectionObserver(function (enteries) {
        enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
        });
    }, optionsLazyLoad);

    images.forEach(function (image) {
        imageObserver.observe(image);
    });
}

function preloadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
        img.parentElement.classList.remove("loading-omd");
        img.parentElement.classList.add("loaded-omd");
        img.parentElement.parentElement.classList.add("lazy-head-om");
    };
}

jQuery(document).ready(function ($) {
    /********************************
     *
     * main slider  *
     *
     ********************************/
    new Swiper(".main-slider-om .swiper-container", {
        spaceBetween: 30,
        effect: "fade",
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".main-slider-om .swiper-pagination",
            clickable: true,
        },
        // navigation: {
        //     nextEl: '.main-slider-om .swiper-button-next',
        //     prevEl: '.main-slider-om .swiper-button-prev',
        // },
    });

    /********************************
     *
     * new products slider  *
     *
     ********************************/
    new Swiper(".h-new_products__ .swiper-container", {
        spaceBetween: 30,
        slidesPerView: 4,
        freeMode: true,
        autoplayDisableOnInteraction: true,
        // longSwipes: true,
        // autoplay: 3000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },

        navigation: {
            nextEl: ".h-new_products__ .swiper-button-next",
            prevEl: ".h-new_products__ .swiper-button-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    /********************************
     *
     * favorite offers slider  *
     *
     ********************************/
    new Swiper(".h-favorite-offers-om .swiper-container", {
        spaceBetween: 30,
        slidesPerView: 4,
        freeMode: true,
        autoplayDisableOnInteraction: true,
        // longSwipes: true,
        // autoplay: 3000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },

        navigation: {
            nextEl: ".h-favorite-offers-om .swiper-button-next",
            prevEl: ".h-favorite-offers-om .swiper-button-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    /********************************
     *
     * home -- choosen section slider  *
     *
     ********************************/
    new Swiper(".h-choosen-section-om .swiper-container", {
        spaceBetween: 30,
        slidesPerView: 4,
        freeMode: true,
        longSwipes: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },

        navigation: {
            nextEl: ".h-choosen-section-om .swiper-button-next",
            prevEl: ".h-choosen-section-om .swiper-button-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    /********************************
     *
     * toggle fav class in a product --  *
     *
     ********************************/

    $(".fav-butt-om").on("click", function (e) {
        e.preventDefault();

        $(this).toggleClass("favorite-product-active-om");
    });

    /********************************
     *
     * signin modal --verification code input   *
     *
     ********************************/
    function verification_code_seprate() {
        const inputElements = [
            ...document.querySelectorAll("input.code-input"),
        ];

        inputElements.forEach((ele, index) => {
            ele.addEventListener("keydown", (e) => {
                // if the keycode is backspace & the current field is empty
                // focus the input before the current. The event then happens
                // which will clear the input before the current
                if (e.keyCode === 8 && e.target.value === "") {
                    inputElements[Math.max(0, index - 1)].focus();
                }
            });
            ele.addEventListener("input", (e) => {
                if (e.target.value === "") {
                    inputElements[index].classList = "code-input";
                } else {
                    inputElements[index].classList = "code-input active";
                }

                // take the first character of the input
                // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
                // but I'm willing to overlook insane security code practices.
                const [first, ...rest] = e.target.value;
                e.target.value = first ?? ""; // the `??` '' is for the backspace usecase
                const lastInputBox = index === inputElements.length - 1;
                const insertedContent = first !== undefined;
                if (insertedContent && !lastInputBox) {
                    // continue to input the rest of the string
                    inputElements[index + 1].focus();
                    inputElements[index + 1].value = rest.join("");
                    inputElements[index + 1].dispatchEvent(new Event("input"));
                }
            });
        });
    }
    verification_code_seprate();

    /********************************
     *
     * login modal -- timer    *
     *
     ********************************/
    startTimer();

    function startTimer() {
        const timer_element = document.getElementById("timer");

        if (timer_element) {
            let presentTime = timer_element.innerHTML;
            let timeArray = presentTime.split(/[:]+/);
            let m = timeArray[0];
            let s = checkSecond(timeArray[1] - 1);
            if (s == 59) {
                m = m - 1;
            }
            if ((m + "").length == 1) {
                m = "0" + m;
            }
            if (m < 0) {
                m = "59";
            }
            document.getElementById("timer").innerHTML = m + ":" + s;
            setTimeout(startTimer, 1000);
        }
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = "0" + sec;
        } // add zero in front of numbers < 10
        if (sec < 0) {
            sec = "59";
        }
        return sec;
    }

    /********************************
     *
     * upload images file input *
     *
     ********************************/

    $(".upload_image_group__ .file_input_").on("change", function (e) {
        let files_data = Array.from($(this)[0].files);

        let files_names_html = "";

        files_data.forEach((file) => {
            files_names_html +=
                "<span class='file_name__'>" + file.name + "</span>";
        });

        let files_list_div = $(this)
            .closest(".upload_images_wrapper")
            .children()[1];

        // files_list_div.innerHTML = "";

        files_list_div.innerHTML = files_names_html;
    });

    /********************************
     *
     * tabs block for main singin form  *
     *
     ********************************/

    $(".ss-activate-tab-om").on("click", function (e) {
        e.preventDefault();

        let target_id = $(this).data("form-tab");

        $(target_id).siblings().removeClass("active-om").hide();
        $(target_id).fadeIn().addClass("active-om");
    });

    /********************************
     *
     * header search result  *
     *
     ********************************/
    $("#search-result-history-om").on("click", function (e) {
        e.stopPropagation();

        //remove this element element when cross is clicked
        if ($(e.target).is(".close-butt-om")) {
            // console.log();
            $(e.target).parent().remove();
        }

        // remove all elements form the list
        if ($(e.target).is(".remove-all-search-history")) {
            // console.log();
            $(e.target)
                .closest("#search-result-history-om")
                .find(".search-result-list-om")
                .html("");
        }
    });

    // activate search history on focus
    $("body").on("click", function (e) {
        if ($(e.target).is("#header-search-input-om")) {
            if (!$(e.target).val()) {
                $("#search-result-history-om").addClass("active-sh");
            }
        } else {
            $("#search-result-history-om").removeClass("active-sh");
        }
    });

    $("#header-search-input-om").on("keyup", function (e) {
        if ($(this).val()) {
            $("#search-result-history-om").removeClass("active-sh");
        } else {
            $("#search-result-history-om").addClass("active-sh");
        }
    });

    // end header search result

    /********************************
     *
     * show password  *
     *
     ********************************/
    $(".show-password-button-om").on("click", function (e) {
        e.preventDefault();

        if ($(this).parent().find("input").attr("type") == "text") {
            $(this).parent().find("input").attr("type", "password");
            $(this).removeClass("show-om");
        } else {
            $(this).parent().find("input").attr("type", "text");
            $(this).addClass("show-om");
        }
    });

    if ($(window).width() <= 991) {
        /********************************
         *
         *  colapsed in small sizes *
         *
         ********************************/
        $(".collapse-head-om").on("click", function () {
            // $('.collapse-head-om').not(this).parent().find('.list-collapse-om').slideUp();
            // console.log($(this).parent().siblings().find('.list-collapse-om').slideUp());
            $(this)
                .parent()
                .find("> .list-collapse-om")
                .slideToggle({
                    queue: false,
                    complete: function () {
                        $(".list-collapse-om").each(function () {
                            if ($(this).css("display") == "none") {
                                $(this).parent().removeClass("active");
                            } else {
                                $(this).parent().addClass("active");
                            }
                        });
                    },
                });
        });

        /********************************
         *
         *  colapsed in small sizes *
         *
         ********************************/
        $(".all-categories-section .all-cats-butt-om").on(
            "click",
            function (e) {
                e.preventDefault();

                $(this)
                    .parent()
                    .find(".header-categoreies-mega-menu-om")
                    .slideToggle();
            }
        );
    }

    /********************************
     *
     * menu active and close button  *
     *
     ********************************/
    // nav men activation
    $("#menu-butt-activ-om").on("click", function (e) {
        e.preventDefault();

        $("#navbar-menu-om").addClass("active-menu");
        $("#navbar-overlay-om").addClass("active");
        $("body").addClass("overflow-body");
    });

    // nav men close
    $("#navbar-close-butt-om , #navbar-overlay-om ").on("click", function (e) {
        e.preventDefault();
        $("#navbar-menu-om").removeClass("active-menu");
        $("#navbar-overlay-om").removeClass("active");

        $("body").removeClass("overflow-body");
    });

    /********************************
     *
     * sticky navbar *
     *
     ********************************/
    // asign height to the header
    var headerHeight = $("header").outerHeight();

    var lastScroll = 0;
    $(document).on("scroll", function () {
        var currentScroll = $(this).scrollTop();

        // scroll down
        if (currentScroll < lastScroll && currentScroll > headerHeight + 100) {
            // add class avtive menu
            // if ($(".fixed-header-warper").hasClass("not-active-menu-om")) {
            $(".fixed-header-warper").addClass("active-menu-om");
            $(".fixed-header-warper").removeClass("not-active-menu-om");
            // }
            // console.log("move up");
        } else if (
            currentScroll > lastScroll &&
            currentScroll > headerHeight + 100
        ) {
            // scroll up
            // remove class avtive menu
            if ($(".fixed-header-warper").hasClass("active-menu-om")) {
                $(".fixed-header-warper").removeClass("active-menu-om");
                $(".fixed-header-warper").addClass("not-active-menu-om");
            }
            // $("#search-button-activation-om").removeClass("search-is-active");
            // $("#search-form-act-om").addClass("not-active").removeClass("active");
        } else {
            $(".fixed-header-warper").removeClass("active-menu-om");
            $(".fixed-header-warper").removeClass("not-active-menu-om");
        }
        lastScroll = currentScroll;
    });

    /********************************
     *
     * search page  - filter collapse *
     *
     ********************************/
    $(".sp-filter-block-om .site-head-block-om").on("click", function (e) {
        e.preventDefault();
        $(this)
            .toggleClass("collapsed")
            .parent()
            .find(".sp-filter-list-om")
            .slideToggle();
        console.log();
    });

    /********************************
     *
     * search page  - result section remove butt *
     *
     ********************************/
    // remove all butt
    $("#sp-all-result-remove-om").on("click", function (e) {
        e.preventDefault();

        $("#sp-search-result-list-om").html("");
    });

    // remove element butt
    $(".sp-search-result-section-om .close-butt-om").on("click", function (e) {
        e.preventDefault();

        $(this).parent().remove();
    });

    /********************************
     *
     * search page  - result section remove butt *
     *
     ********************************/

    $(".spp-layout-buttons-om .butt-om").on("click", function (e) {
        e.preventDefault();

        $(this).addClass("active-om").siblings().removeClass("active-om");

        if ($(this).hasClass("network-grid-om")) {
            $("#spp_change_layout_om").removeClass("list-grid-om");
        } else {
            $("#spp_change_layout_om").addClass("list-grid-om");
        }
    });

    /********************************
     *
     * search page  - menu filter in small sizes *
     *
     ********************************/
    $("#search-fliter-menu-butt-activ-om").on("click", function (e) {
        e.preventDefault();

        $("#search-fliter-menu-om").addClass("active-menu");
        $("#search-fliter-overlay-om").addClass("active");
        $("body").addClass("overflow-body");
    });

    $("#search-fliter-overlay-om , #search-fliter-close-butt-om").on(
        "click",
        function (e) {
            e.preventDefault();

            $("#search-fliter-menu-om").removeClass("active-menu");
            $("#search-fliter-overlay-om").removeClass("active");
            $("body").removeClass("overflow-body");
        }
    );

    /********************************
     *
     * single product page  - triger tab button *
     *
     ********************************/

    $("#show_allspecs_triger_tab_om").on("click", function (e) {
        e.preventDefault();

        $("#product-specifications-tab").trigger("click");
    });

    /********************************
     *
     * mixItUp init  *
     *
     ********************************/
    // function mixItUpInit() {
    //     var containerEl = document.querySelector('#mix-container-om');
    //     var mixer = "";
    //     if (containerEl) {

    //         mixer = mixitup(containerEl);
    //         mixer.forceRefresh();
    //     }
    // }
    // mixItUpInit();

    /********************************
     *
     * input file value change  *
     *
     ********************************/

    //  $('.input-file-om ').on('change', function(e) {
    //      var fileName = " ";
    //      if (e.target.files[0]) {
    //          fileName = e.target.files[0].name;

    //      }
    //      var elementToTakeFileVal = $(this).parent().parent().children(".file-ouput");

    //      elementToTakeFileVal.text(fileName);
    //  });
});
