var express = require('express');
const { render } = require('express/lib/response');
var router = express.Router();
// let pool = require('../config/database');
// let sequelize = require('../config/database');
// const { Sequelize, Model, DataTypes } = require('@sequelize/core');
const models = require('../models/index');

// let { survey } = require('../models/init-models');

/* GET home page. */
router.get('/', async function (req, res, next) {
	let surveyDetails = {
		id: 10,
		encr_id: 'hiuhihioioohhioihoi',
		title: 'dyn title',
	};

	let scriptSnippet = `
	
	
	<script src="http://localhost:8000/assets/js/script.js"></script>
<script>
var hostUrl = window.location.protocol + "//" + window.location.hostname + "/v2";

	var myHeaders = new Headers,
		requestOptions = {
			method: "GET",
			redirect: "follow"
		},
		apiUrl = "http://localhost:8000",
		surveyId = ${surveyDetails.id},
		surveyEncrId = ${surveyDetails.encr_id};
	const isNps = getWithExpiry('nps_survey_' + ${surveyDetails.id});
	if (isNps == null) {
		fetch("http://localhost:8000/api/v1/survey/load-survey/${surveyDetails.encr_id}", requestOptions).then(e => e.text()).then(function (e) {
			e = JSON.parse(e);
			var r = document.querySelector("body");
			r.innerHTML = r.innerHTML + e.data.html;
			var t = "";
			[].forEach.call(document.querySelectorAll(".btn-score"), function (e) {
				e.addEventListener("click", function () {
					var r = document.querySelectorAll(".btn-score");
					for (var o of r) {
						o.classList.add("btn-score-inactive");
						o.classList.remove("active");
					}
					e.classList.remove("btn-score-inactive"), e.classList.add("active"), t = e.getAttribute("data-value")
				})
			}), document.querySelector(".submit-review").addEventListener("click", function (e) {
				var r = new Headers;
				r.append("Content-Type", "application/x-www-form-urlencoded");
				var o = new URLSearchParams;
				o.append("survey_id", surveyId), o.append("score_value", t), o.append("review_message", (document.querySelector("#comment") ?  document.querySelector("#comment").value : '')), o.append("name", (document.querySelector("#name") ?  document.querySelector("#name").value : '')), o.append("website", window.location.host), o.append("url", window.location.href), fetch('"http://localhost:8000/api/v1/survey/set-survey-response', {
					method: "POST",
					headers: r,
					body: o,
					redirect: "follow"
				}).then(e => e.text()).then(function (e) {
					var r = document.querySelectorAll(".btn-score");
					for (var t of r) t.classList.remove("btn-score-inactive"), (document.querySelector("#comment") ?  document.querySelector("#comment").value = "" : '');
					document.querySelector(".suvery-modal.open").remove();
					document.querySelector(".suvery-modal-thankyou").classList.add('open');
					setTimeout(function() { document.querySelector(".suvery-modal-thankyou").remove(); }, 5000);
					setWithExpiry('nps_survey_'  + surveyId, 'true', 30);
				}).catch(e => console.log("error", e))
			}), document.querySelector(".nps-close").addEventListener("click", function(e) {
				e.preventDefault();
				document.querySelector(".suvery-modal.open").remove();
				setWithExpiry('nps_survey_'  + surveyId, 'true', 1);
			}), document.querySelector(".close-thankyou").addEventListener("click", function (e) {
				e.preventDefault();
				this.closest('.suvery-modal-thankyou').remove();
			});
		});
	}
</script>

	`;

	res.status(200).json({
		html: scriptSnippet,
	});
});

module.exports = router;
