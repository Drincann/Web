/*
 * Canvas Matrix
 * JavaScript based "The Matrix" like implementation.
 * Created by Shuqiao Zhang in 2017.
 * https://zhangshuqiao.org
 */

/*
 * This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 */

(function() {
	var scripts = document.getElementsByTagName("script"),
		script = scripts[scripts.length - 1],
		fontSize = script.getAttribute("size") || 16,
		fontName = script.getAttribute("font") || "monospace";

	var canvas = document.createElement("canvas"),
		context = canvas.getContext("2d");
	document.body.appendChild(canvas);
	canvas.style.cssText = "position: fixed; top: 0; left: 0; background-color: #111; z-index: -1;";
	var W = window.innerWidth,
		H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	var colunms = Math.floor(W / fontSize),
		drops = [],
		str = "QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()1234567890qwertyuiopasdfghjklzxcvbnm";
	for (var i = 0; i < colunms; i++) {
		drops.push(Math.ceil(canvas.height / fontSize) + 1);
	}
	setInterval(function() {
		context.fillStyle = "rgba(0,0,0,0.05)";
		context.fillRect(0, 0, W, H);
		context.font = `700 ${fontSize}px ${fontName}`;
		context.fillStyle = "#00cc33";
		for (var i = 0; i < colunms; i++) {
			var index = Math.floor(Math.random() * str.length),
				x = i * fontSize,
				y = drops[i] * fontSize;
			context.fillText(str[index], x, y);
			if (y >= canvas.height && Math.random() > 0.99) {
				drops[i] = 0;
			}
			drops[i]++;
		}
	}, 120);

	window.addEventListener("resize", function() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = W;
		canvas.height = H;
		colunms = Math.floor(W / fontSize);
		drops = [];
		for (var i = 0; i < colunms; i++) {
			drops.push(Math.ceil(canvas.height / fontSize) + 1);
		}
	});
})();
