<script src="{{Config::get('app.url')}}/assets/js/script.js"></script>
<script>
// resources\views\survey\snippet.blade.php
var hostUrl = window.location.protocol + "//" + window.location.hostname + "/v2";
console.log("host url is ----",hostUrl);

	var myHeaders = new Headers,
		requestOptions = {
			method: "GET",
			redirect: "follow"
		},
		apiUrl = "{{Config::get('app.url')}}",
		surveyId = {{$surveyDetails->id}},
		surveyEncrId = "{{$surveyDetails->encr_id}}";
	const isNps = getWithExpiry('nps_survey_' + surveyId);
	if (isNps == null) {
		fetch(`${apiUrl}/api/v1/survey/load-survey/${surveyEncrId}`, requestOptions).then(e => e.text()).then(function (e) {
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
				o.append("survey_id", surveyId), o.append("score_value", t), o.append("review_message", (document.querySelector("#comment") ?  document.querySelector("#comment").value : '')), o.append("name", (document.querySelector("#name") ?  document.querySelector("#name").value : '')), o.append("website", window.location.host), o.append("url", window.location.href), fetch(`${apiUrl}/api/v1/survey/set-survey-response`, {
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
