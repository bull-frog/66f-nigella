var section_title;
var section_nigella;
var section_film;
var section_cast;
var building;
var film;
var clapper;
var video1;
var video2;

window.onload = function() {
	section_title = document.getElementById("section-title")
	section_nigella = document.getElementById("nigella");
	section_film = document.getElementById("section-film");
	section_cast = document.getElementById("section-cast");
	building = document.getElementById("building");
	film = document.getElementById("film");
	clapper = document.getElementById("clapper");
	video1 = document.getElementById("nigella-1");
	video2 = document.getElementById("nigella-2");
}

window.onscroll = function(e) {
	var title_scrollLife = elementScrollLife(section_title);
	if (elementIsDisplayed(section_title)) {
		var playTime = ease(title_scrollLife, 0, 1, 0, 10, 0);
		video1.currentTime = playTime;
		video2.currentTime = playTime;
	}
	var nigella_scrollLife = elementScrollLife(section_nigella);
	if (elementIsDisplayedWide(section_nigella)) {
		var transform = ease(nigella_scrollLife, 0, 1, 0, -30, 1);
		building.style.transform = "translateX(" + transform + "vw)";
	}
	var film_scrollLife = elementScrollLifeWide(section_film);
	if (elementIsDisplayedWide(section_film)) {
		var transform = ease(film_scrollLife, 0, 1, 0, -50, 1);
		film.style.transform = "translateY(" + transform + "%)";
	}
	var cast_scrollLife = elementScrollLife(section_cast);
	if (elementIsDisplayed(section_cast)) {
		var transform = ease(cast_scrollLife, 0, 1, 0, -60, 1);
		clapper.style.transform = "translateX(-50%) translateY(" + transform + "vh)";
	}
}

function elementIsDisplayed(e) {
	return (0 <= elementScrollLife(e) && elementScrollLife(e) <= 1);
}

function elementIsDisplayedWide(e) {
	return (0 <= elementScrollLifeWide(e) && elementScrollLifeWide(e) <= 1);
}

// 画面に表示された瞬間から消える瞬間までアニメーション
function elementScrollLifeWide(e) {
	var scroll = e.getBoundingClientRect().top;
	return (window.innerHeight - scroll) / (window.innerHeight + e.clientHeight);
}

// 十分に表示されている間のみアニメーション
function elementScrollLife(e) {
	var scroll = e.getBoundingClientRect().top;
	var mh = Math.min(e.clientHeight / 2, window.innerHeight / 2);
	return (scroll - window.innerHeight + mh) / (2 * mh - e.clientHeight - window.innerHeight);
}

/**
 * @param {number} x - 入力値
 * @param {number} xa - 入力の最初の値
 * @param {number} xb - 入力の最後の値
 * @param {number} ya - 出力の最初の値
 * @param {number} yb - 出力の最後の値
 * @param {number} easing - イージング（0；なし、1；サインカーブ）
 */
function ease(x, xa, xb, ya, yb, easing) {

	// エラーとなる状況
	if (xa == xb) {
		return (ya + yb) / 2
	}

	// 定義域外の時（xaの外側）
	if ((xa < xb && x <= xa) || (xb < xa && xa <= x)) {
		return ya;
	}

	// 定義域外の時（xbの外側）
	if ((xa < xb && xb <= x) || (xb < xa && x <= xb)) {
		return yb;
	}
	
	// 定義域内の時
	if (easing == 1) {
		// サインカーブによるイージング
		var altx = ease(x, xa, xb, -Math.PI/2, Math.PI/2, 0) // xを-pi/2~pi/2に変換
		var origy = Math.sin(altx); // サインカーブでイージング
		return ease(origy, -1, 1, ya, yb, 0);
	} else {
		// 一次関数
		return (yb - ya) / (xb - xa) * (x - xa) + ya;
	}

}