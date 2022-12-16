(function (_0x90e55d, _0x1a66a9) {
	var _0x2db04e = _0x419c,
		_0xcbd4f4 = _0x90e55d();
	while (!![]) {
		try {
			var _0x68843e =
				(parseInt(_0x2db04e(0x15c)) / 0x1) *
					(parseInt(_0x2db04e(0x159)) / 0x2) +
				parseInt(_0x2db04e(0x164)) / 0x3 +
				parseInt(_0x2db04e(0x18b)) / 0x4 +
				-parseInt(_0x2db04e(0x157)) / 0x5 +
				(-parseInt(_0x2db04e(0x15b)) / 0x6) *
					(parseInt(_0x2db04e(0x185)) / 0x7) +
				-parseInt(_0x2db04e(0x16a)) / 0x8 +
				-parseInt(_0x2db04e(0x188)) / 0x9;
			if (_0x68843e === _0x1a66a9) break;
			else _0xcbd4f4['push'](_0xcbd4f4['shift']());
		} catch (_0xfbdc1a) {
			_0xcbd4f4['push'](_0xcbd4f4['shift']());
		}
	}
})(_0x357b, 0xc86d9);
function setWithExpiry(_0x42b111, _0x1128cc, _0x4c4235) {
	var _0x11d013 = _0x419c;
	const _0x600c44 = new Date(),
		_0x46b638 = {
			value: _0x1128cc,
			expiry: _0x600c44['setDate'](
				_0x600c44[_0x11d013(0x167)]() + _0x4c4235
			),
		};
	localStorage['setItem'](_0x42b111, JSON[_0x11d013(0x180)](_0x46b638));
}
function _0x357b() {
	var _0x2a3185 = [
		'true',
		'.close-thankyou',
		'.suvery-modal.open',
		'token',
		'#comment',
		'follow',
		'success',
		'getAttribute',
		'remove',
		'expiry',
		'application/x-www-form-urlencoded',
		'3060760KpyCQS',
		'href',
		'2WCqsDR',
		'parse',
		'48ynCtjG',
		'1497571jAJzxq',
		'innerHTML',
		'website',
		'call',
		'btn-score-inactive',
		'Submitted\x20successfully\x20!',
		'addEventListener',
		'.nps-close',
		'4487907rNGqJM',
		'forEach',
		'querySelector',
		'getDate',
		'active',
		'preventDefault',
		'8132488OyHLWj',
		'catch',
		'getItem',
		'url',
		'POST',
		'#name',
		'score_value',
		'click',
		'value',
		'.suvery-modal-thankyou',
		'north-east',
		'host',
		'Content-Type',
		'open',
		'then',
		'text',
		'html',
		'removeItem',
		'add',
		'classList',
		'survey_id',
		'body',
		'stringify',
		'querySelectorAll',
		'message',
		'.btn-score',
		'append',
		'819021XzIuLT',
		'/api/v1/survey/set-survey-response',
		'.submit-review',
		'3479103JeHvPM',
		'review_message',
		'GET',
		'3114868GsIsIo',
		'log',
		'error',
		'nps_survey_',
		'location',
		'data-value',
	];
	_0x357b = function () {
		return _0x2a3185;
	};
	return _0x357b();
}
function _0x419c(_0x2fc088, _0x4a68bf) {
	var _0x357b05 = _0x357b();
	return (
		(_0x419c = function (_0x419c88, _0x327e45) {
			_0x419c88 = _0x419c88 - 0x14d;
			var _0x5e8f47 = _0x357b05[_0x419c88];
			return _0x5e8f47;
		}),
		_0x419c(_0x2fc088, _0x4a68bf)
	);
}
function getWithExpiry(_0x19094f) {
	var _0x2c36cf = _0x419c;
	const _0x1a3a33 = localStorage[_0x2c36cf(0x16c)](_0x19094f);
	if (!_0x1a3a33) return null;
	const _0x5aae8b = JSON[_0x2c36cf(0x15a)](_0x1a3a33),
		_0x242d4f = new Date();
	if (_0x242d4f[_0x2c36cf(0x167)]() > _0x5aae8b[_0x2c36cf(0x155)])
		return localStorage[_0x2c36cf(0x17b)](_0x19094f), null;
	return _0x5aae8b[_0x2c36cf(0x172)];
}
function getSnippet(_0x103c6a, _0x40bc38, _0x8187d6) {
	var _0x382bdd = _0x419c;
	let _0x92c1ef = { method: _0x382bdd(0x18a), redirect: _0x382bdd(0x151) };
	const _0x4d5232 = getWithExpiry(_0x382bdd(0x18e) + _0x103c6a);
	_0x4d5232 == null &&
		fetch(
			_0x40bc38 + '/api/v1/survey/load-survey/' + _0x8187d6,
			_0x92c1ef
		)
			[_0x382bdd(0x178)]((_0x486483) => _0x486483[_0x382bdd(0x179)]())
			[_0x382bdd(0x178)](function (_0x1aefae) {
				var _0x3ab20f = _0x382bdd;
				_0x1aefae = JSON['parse'](_0x1aefae);
				var _0x112d47 = document[_0x3ab20f(0x166)](
					_0x3ab20f(0x17f)
				);
				_0x112d47[_0x3ab20f(0x15d)] =
					_0x112d47[_0x3ab20f(0x15d)] +
					_0x1aefae['data'][_0x3ab20f(0x17a)];
				var _0x3118d7 = '';
				[][_0x3ab20f(0x165)][_0x3ab20f(0x15f)](
					document[_0x3ab20f(0x181)]('.btn-score'),
					function (_0x23f227) {
						var _0x3dacf6 = _0x3ab20f;
						_0x23f227[_0x3dacf6(0x162)](
							_0x3dacf6(0x171),
							function () {
								var _0x3e58fa = _0x3dacf6,
									_0x1c092c = document[
										_0x3e58fa(0x181)
									](_0x3e58fa(0x183));
								for (var _0x55c4b3 of _0x1c092c) {
									_0x55c4b3[_0x3e58fa(0x17d)]['add'](
										_0x3e58fa(0x160)
									),
										_0x55c4b3[_0x3e58fa(0x17d)][
											'remove'
										](_0x3e58fa(0x168));
								}
								_0x23f227['classList'][
									_0x3e58fa(0x154)
								]('btn-score-inactive'),
									_0x23f227['classList']['add'](
										_0x3e58fa(0x168)
									),
									(_0x3118d7 = _0x23f227[
										_0x3e58fa(0x153)
									](_0x3e58fa(0x190)));
							}
						);
					}
				),
					document[_0x3ab20f(0x166)](_0x3ab20f(0x187))[
						_0x3ab20f(0x162)
					](_0x3ab20f(0x171), function (_0x47b03b) {
						var _0x4402a6 = _0x3ab20f,
							_0x2f2494 = new Headers();
						_0x2f2494[_0x4402a6(0x184)](
							_0x4402a6(0x176),
							_0x4402a6(0x156)
						);
						var _0x27428b = new URLSearchParams();
						_0x27428b[_0x4402a6(0x184)](
							_0x4402a6(0x17e),
							_0x103c6a
						),
							_0x27428b[_0x4402a6(0x184)](
								_0x4402a6(0x14f),
								_0x8187d6
							),
							_0x27428b[_0x4402a6(0x184)](
								_0x4402a6(0x170),
								_0x3118d7
							),
							_0x27428b['append'](
								_0x4402a6(0x189),
								document[_0x4402a6(0x166)](
									_0x4402a6(0x150)
								)
									? document['querySelector'](
											_0x4402a6(0x150)
									  )[_0x4402a6(0x172)]
									: ''
							),
							_0x27428b[_0x4402a6(0x184)](
								'name',
								document['querySelector'](
									_0x4402a6(0x16f)
								)
									? document['querySelector'](
											_0x4402a6(0x16f)
									  )[_0x4402a6(0x172)]
									: ''
							),
							_0x27428b[_0x4402a6(0x184)](
								_0x4402a6(0x15e),
								window[_0x4402a6(0x18f)][
									_0x4402a6(0x175)
								]
							),
							_0x27428b[_0x4402a6(0x184)](
								_0x4402a6(0x16d),
								window['location'][_0x4402a6(0x158)]
							),
							fetch(_0x40bc38 + _0x4402a6(0x186), {
								method: _0x4402a6(0x16e),
								headers: _0x2f2494,
								body: _0x27428b,
								redirect: _0x4402a6(0x151),
							})
								[_0x4402a6(0x178)]((_0x259cfb) =>
									_0x259cfb[_0x4402a6(0x179)]()
								)
								[_0x4402a6(0x178)](function (
									_0xbbc52e
								) {
									var _0x2d5e84 = _0x4402a6;
									_0xbbc52e =
										JSON[_0x2d5e84(0x15a)](
											_0xbbc52e
										);
									if (
										_0xbbc52e[
											_0x2d5e84(0x152)
										] === 0x1
									) {
										nativeToast({
											message: _0x2d5e84(
												0x161
											),
											position:
												_0x2d5e84(0x174),
											rounded: !![],
											timeout: 0xfa0,
											type: _0x2d5e84(0x152),
											icon: !![],
											edge: !![],
											closeOnClick: !![],
										});
										var _0xcb399e =
											document[
												'querySelectorAll'
											]('.btn-score');
										for (var _0x4433d9 of _0xcb399e)
											_0x4433d9[
												_0x2d5e84(0x17d)
											][_0x2d5e84(0x154)](
												_0x2d5e84(0x160)
											),
												document[
													_0x2d5e84(
														0x166
													)
												](_0x2d5e84(0x150))
													? (document[
															'querySelector'
													  ](
															_0x2d5e84(
																0x150
															)
													  )['value'] =
															'')
													: '';
										document[_0x2d5e84(0x166)](
											_0x2d5e84(0x14e)
										)[_0x2d5e84(0x154)](),
											document[
												_0x2d5e84(0x166)
											](_0x2d5e84(0x173))[
												'classList'
											][_0x2d5e84(0x17c)](
												_0x2d5e84(0x177)
											),
											setTimeout(function () {
												var _0x34f8a7 =
													_0x2d5e84;
												document[
													_0x34f8a7(
														0x166
													)
												](_0x34f8a7(0x173))[
													'remove'
												]();
											}, 0x1388),
											setWithExpiry(
												_0x2d5e84(0x18e) +
													_0x103c6a,
												_0x2d5e84(0x191),
												0x1e
											);
									} else
										nativeToast({
											message: _0xbbc52e[
												_0x2d5e84(0x182)
											],
											position:
												_0x2d5e84(0x174),
											rounded: !![],
											timeout: 0xfa0,
											type: _0x2d5e84(0x18d),
											icon: !![],
											edge: !![],
											closeOnClick: !![],
										});
								})
								[_0x4402a6(0x16b)]((_0x227c88) =>
									console[_0x4402a6(0x18c)](
										_0x4402a6(0x18d),
										_0x227c88
									)
								);
					}),
					document[_0x3ab20f(0x166)](_0x3ab20f(0x163))[
						_0x3ab20f(0x162)
					](_0x3ab20f(0x171), function (_0x959b36) {
						var _0x46b3df = _0x3ab20f;
						_0x959b36[_0x46b3df(0x169)](),
							document[_0x46b3df(0x166)](_0x46b3df(0x14e))[
								'remove'
							](),
							setWithExpiry(
								_0x46b3df(0x18e) + _0x103c6a,
								_0x46b3df(0x191),
								0x1
							);
					}),
					document[_0x3ab20f(0x166)](_0x3ab20f(0x14d))[
						'addEventListener'
					](_0x3ab20f(0x171), function (_0x2e6de3) {
						var _0x544f4f = _0x3ab20f;
						_0x2e6de3[_0x544f4f(0x169)](),
							this['closest'](_0x544f4f(0x173))[
								_0x544f4f(0x154)
							]();
					});
			});
}
