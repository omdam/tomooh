/********************************
 *
 * lazy load  *
 *
 ********************************/
lazyLoad();

function lazyLoad() {
    const images = document.querySelectorAll(".lazy__d");

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
        img.parentElement.classList.remove("loading__d");
        img.parentElement.classList.add("loaded__d");
        img.parentElement.parentElement.classList.add("lazy-head__");
    };
}

jQuery(document).ready(function ($) {
    /********************************
     *
     * upload images file input *
     *
     ********************************/

    // $(".upload_image_group__ .file_input_").on("change", function (e) {
    //     let files_data = Array.from($(this)[0].files);

    //     let files_names_html = "";

    //     files_data.forEach((file) => {
    //         files_names_html +=
    //             "<span class='file_name__'>" + file.name + "</span>";
    //     });

    //     let files_list_div = $(this)
    //         .closest(".upload_images_wrapper")
    //         .children()[1];

    //     // files_list_div.innerHTML = "";

    //     files_list_div.innerHTML = files_names_html;
    // });

    /********************************
     *
     * choose_who_sign_in  radio label   *
     *
     ********************************/
    $(".choose_wo_sign_in__ .block__").on("click",function(e){
        $(this).siblings().removeClass("active__");
        $(this).addClass("active__");
    }) ;

    /********************************
     *
     * show password  *
     *
     ********************************/
    $(".show-password-button__").on("click", function (e) {
        e.preventDefault();

        if ($(this).parent().find("input").attr("type") == "text") {
            $(this).parent().find("input").attr("type", "password");
            $(this).removeClass("show__");
        } else {
            $(this).parent().find("input").attr("type", "text");
            $(this).addClass("show__");
        }
    });

    if ($(window).width() <= 991) {
        /********************************
         *
         *  colapsed in small sizes *
         *
         ********************************/
        $(".collapse-head__").on("click", function () {
            // $('.collapse-head__').not(this).parent().find('.list-collapse__').slideUp();
            // console.log($(this).parent().siblings().find('.list-collapse__').slideUp());
            $(this)
                .parent()
                .find("> .list-collapse__")
                .slideToggle({
                    queue: false,
                    complete: function () {
                        $(".list-collapse__").each(function () {
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
        $(".all-categories-section .all-cats-butt__").on("click", function (e) {
            e.preventDefault();

            $(this)
                .parent()
                .find(".header-categoreies-mega-menu__")
                .slideToggle();
        });
    }

    /********************************
     *
     * menu active and close button  *
     *
     ********************************/
    // nav men activation
    $("#menu-butt-activ__").on("click", function (e) {
        e.preventDefault();

        $("#navbar-menu__").addClass("active-menu");
        $("#navbar-overlay__").addClass("active");
        $("body").addClass("overflow-body");
    });

    // nav men close
    $("#navbar-close-butt__ , #navbar-overlay__ ").on("click", function (e) {
        e.preventDefault();
        $("#navbar-menu__").removeClass("active-menu");
        $("#navbar-overlay__").removeClass("active");

        $("body").removeClass("overflow-body");
    });
});
