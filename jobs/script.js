
/*
$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});
*/

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll("div.bhoechie-tab-menu>div.list-group>a").forEach(el => el.onclick = (e) => {
        e.preventDefault();
        console.log([...e.currentTarget.parentElement.children]);
        let index = [...e.currentTarget.parentElement.children].findIndex(ele => ele.classList.contains('active'));
        [...e.currentTarget.parentElement.children].forEach((element, index) => element.classList.remove('active'));
        e.target.classList.add('active');
        document.querySelectorAll("div.bhoechie-tab>div.bhoechie-tab-content").forEach(ele => ele.classList.remove("active"));
        document.querySelectorAll("div.bhoechie-tab>div.bhoechie-tab-content")[index].classList.add("active");
    });
});
