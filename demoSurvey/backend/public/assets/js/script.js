function setWithExpiry(key, value, ttl) {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.setDate(now.getDate() + ttl),
	};
	localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getDate() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
}

function getSnippet(surveyId, apiUrl, surveyEncrId) {
	let headers = new Headers();

	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');

	headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
	headers.append('Access-Control-Allow-Credentials', 'true');

	headers.append('GET', 'POST', 'OPTIONS');

	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	};
	const isNps = getWithExpiry('nps_survey_' + surveyId);
	if (isNps == null) {
		fetch(
			`${apiUrl}/api/v1/survey/load-survey/${surveyEncrId}`,
			requestOptions
		)
			.then((e) => e.text())
			.then(function (e) {
				e = JSON.parse(e);
				var r = document.querySelector('body');
				r.innerHTML = r.innerHTML + e.data.html;
				var t = '';
				[].forEach.call(
					document.querySelectorAll('.btn-score'),
					function (e) {
						e.addEventListener('click', function () {
							var r =
								document.querySelectorAll('.btn-score');
							for (var o of r) {
								o.classList.add('btn-score-inactive');
								o.classList.remove('active');
							}
							e.classList.remove('btn-score-inactive'),
								e.classList.add('active'),
								(t = e.getAttribute('data-value'));
						});
					}
				),
					document
						.querySelector('.submit-review')
						.addEventListener('click', function (e) {
							var r = new Headers();
							r.append(
								'Content-Type',
								'application/x-www-form-urlencoded'
							);
							var o = new URLSearchParams();
							o.append('survey_id', surveyId),
								o.append('token', surveyEncrId),
								o.append('score_value', t),
								o.append(
									'review_message',
									document.querySelector('#comment')
										? document.querySelector(
												'#comment'
										  ).value
										: ''
								),
								o.append(
									'name',
									document.querySelector('#name')
										? document.querySelector(
												'#name'
										  ).value
										: ''
								),
								o.append(
									'website',
									window.location.host
								),
								o.append('url', window.location.href),
								fetch(
									`${apiUrl}/api/v1/survey/set-survey-response`,
									{
										method: 'POST',
										headers: r,
										body: o,
										redirect: 'follow',
									}
								)
									.then((e) => e.text())
									.then(function (e) {
										e = JSON.parse(e);

										console.log('log of e', e);
										if (e.success === 1) {
											nativeToast({
												message: 'Submitted successfully !',
												position:
													'north-east',
												rounded: true,
												timeout: 4000,
												type: 'success',
												icon: true,
												edge: true,
												closeOnClick: true,
											});
											var r =
												document.querySelectorAll(
													'.btn-score'
												);
											for (var t of r)
												t.classList.remove(
													'btn-score-inactive'
												),
													document.querySelector(
														'#comment'
													)
														? (document.querySelector(
																'#comment'
														  ).value =
																'')
														: '';
											document
												.querySelector(
													'.suvery-modal.open'
												)
												.remove();
											document
												.querySelector(
													'.suvery-modal-thankyou'
												)
												.classList.add(
													'open'
												);
											setTimeout(function () {
												document
													.querySelector(
														'.suvery-modal-thankyou'
													)
													.remove();
											}, 5000);
											setWithExpiry(
												'nps_survey_' +
													surveyId,
												'true',
												30
											);
										} else {
											nativeToast({
												message: e.message,
												position:
													'north-east',
												rounded: true,
												timeout: 4000,
												type: 'error',
												icon: true,
												edge: true,
												closeOnClick: true,
											});
										}
									})
									.catch((e) =>
										console.log('error', e)
									);
						}),
					document
						.querySelector('.nps-close')
						.addEventListener('click', function (e) {
							e.preventDefault();
							document
								.querySelector('.suvery-modal.open')
								.remove();
							setWithExpiry(
								'nps_survey_' + surveyId,
								'true',
								1
							);
						}),
					document
						.querySelector('.close-thankyou')
						.addEventListener('click', function (e) {
							e.preventDefault();
							this.closest(
								'.suvery-modal-thankyou'
							).remove();
						});
			});
	}
}
