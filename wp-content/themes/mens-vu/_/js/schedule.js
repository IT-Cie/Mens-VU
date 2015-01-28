// *******************************************************************************************

SCHEDULE = {};
SCHEDULE.C = {}; //constants
SCHEDULE.V = {}; //variables
SCHEDULE.V['overrides'] = {
	'openonload': {},
	'position': {}
};
SCHEDULE.V.browsertype = 'desktop';

var scheduleJson;

/*
title: the title [text or '' keeps the schedule-title div if it's in the html source]
source: the data node [text]
pointer: show a line between information and timeline views [0 or 1]
orientation: whether schedule is horizontal or vertical [x or y]
openonload: whether line is visible on load [0 or 1]
speedtoggle: speed of line view toggle [number of milliseconds / -1 hides toggle control]
speedinfo: speed of info view slide [number of milliseconds / -1 hides view completely]
speedline: speed of timeline view slide [number of milliseconds / -1 hides view completely]
datenow: override now date [d/m/y or 0 to not override]
datestart: schedule start date [d/m/y]
dateend: schedule end date [d/m/y]
infocontrols: whether to show controls for info view [0 or 1]
infooffset: how much to offset the marker position for info view [number of px]
infosize: width (type x) or height (type y) of information event [number of px]
linecontrols: whether to show controls for timeline view [0 or 1]
lineoffset: how much to offset the marker position for timeline view [number of px]
linesizeh: width of timeline day [number of px]
linesizev: height of timeline day [number of px]
*/

//set up the default config - can be overwritten in the html using the data-config attribute as a matching JSON object
SCHEDULE.V['config'] = {};
SCHEDULE.V['config']['default'] = {
	'title':'',
	'source':'events',
	'pointer':'1',
	'orientation':'h',
	'openonload':'1',
	'showtitleattribute':'0',
	'speedtoggle':'-1',
	'speedinfo':'250',
	'speedline':'250',
	'datenow':'0',
	'datestart':'1/1/2012',
	'dateend':'31/12/2014',
	'infocontrols':'1',
	'infooffset':'0',
	'infosize':'160',
	'linecontrols':'0',
	'lineoffset':'-126',
	'linesizeh':'24',
	'linesizev':'14'
};

SCHEDULE.C['delay'] = 75;
SCHEDULE.C['text'] = {
	'control': {
		'close':'&uarr;',
		'open':'&darr;',
		'prev':'&larr;',
		'next':'&rarr;'
	},
	'months': {
		'h': [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		'v': [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]
	},
	'timeSuffix':{
		'am':'am',
		'pm':'pm'
	},
	'view': {
		'event':'Find out more &gt;'
	}
};

// *******************************************************************************************

SCHEDULE.init = function() {
	SCHEDULE.initGroup($('.schedule'));
};

SCHEDULE.initGroup = function(theGroup) {
	SCHEDULE.reset(theGroup);
	SCHEDULE.render(theGroup);
};

SCHEDULE.reset = function(theGroup) {
	if (window.isMobile) {
		SCHEDULE.V.browsertype = 'mobile';
	} else {
		SCHEDULE.V.browsertype = 'desktop';
	}
	theGroup.each(function() {
		var eachElement = $(this);
		if ($('.schedule-title', eachElement).size() == 0) {
			eachElement.empty();
		} else {
			$('.schedule-pointer', eachElement).remove()
			$('.schedule-toggle', eachElement).remove()
			$('.schedule-scroll', eachElement).remove()
		}
	});
};

SCHEDULE.render = function(theGroup) {
	var countSchedule = 0;
	theGroup.each(function() {
		countSchedule++;
		var eachElement = $(this);
		var theId = eachElement.attr('id');
		if (typeof theId === 'undefined') {
			theId = 'schedule-' + countSchedule;
			eachElement.attr({
				'id': theId
			});
		}
		SCHEDULE.create(theId);
	});
};

SCHEDULE.create = function(theId) {
	var theElement = $('#' + theId);
	SCHEDULE.V['config'][theId] = {};
	SCHEDULE.V['config'][theId]['desktop'] = {};
	SCHEDULE.V['config'][theId]['mobile'] = {};
	$.each(SCHEDULE.V['config']['default'], function(key, val) {
		SCHEDULE.V['config'][theId]['desktop'][key] = val;
		SCHEDULE.V['config'][theId]['mobile'][key] = val;
	});
	$.each($.parseJSON(theElement.data('config')), function(key, val) {
		$.each(val, function(subkey, subval) {
			SCHEDULE.V['config'][theId][key][subkey] = subval;
		});
	});

	var timeNow = (new Date().getTime());
	SCHEDULE.setObject(theId, timeNow);
	theElement.removeClass('schedule-h schedule-v');
	theElement.addClass('schedule-' + SCHEDULE.V[theId]['orientation']);
	if(SCHEDULE.V['data'][SCHEDULE.V[theId]['source']].length > 0) {
		SCHEDULE.TITLE.init(theId);
		SCHEDULE.POINTER.init(theId);
		SCHEDULE.TOGGLE.init(theId);
		SCHEDULE.INFO.init(theId);
		SCHEDULE.LINE.init(theId);
		var theHtml = SCHEDULE.buildHtml(theId);
		$('#' + theId).append(theHtml);
		SCHEDULE.setStyles(theId);
		SCHEDULE.SCROLL.init(theId, 'info');
		SCHEDULE.SCROLL.init(theId, 'line');
		if (Number(SCHEDULE.V[theId]['speedtoggle']) >= 0) {
			SCHEDULE.TOGGLE.bindControls(theId);
		}
		SCHEDULE.bindEvents(theId);
	}
};

SCHEDULE.setStyles = function(theId) {
	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		SCHEDULE.V[theId]['infototal'] = Number(SCHEDULE.V[theId]['infototal']) + Number($('#' + theId + ' .schedule-scroll-info').width());
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		SCHEDULE.V[theId]['infototal'] = Number(SCHEDULE.V[theId]['infototal']) + Number($('#' + theId + ' .schedule-scroll-info').height());
	}
	SCHEDULE.setStyle(theId, 'info', 'infototal', '.schedule-scroll-content');
	SCHEDULE.setStyle(theId, 'line', 'linetotal', '.schedule-scroll-content');
	SCHEDULE.setStyle(theId, 'line', 'linetotal', '.schedule-line');
	SCHEDULE.setStyle(theId, 'line', 'linetotal', '.schedule-months');
	SCHEDULE.setStyle(theId, 'line', 'linefill', '.schedule-fill');
	SCHEDULE.setStyleMonths(theId);
	SCHEDULE.setStyleEvents(theId);
};

SCHEDULE.setStyle = function(theId, theSection, theKey, theTarget) {
	if (typeof SCHEDULE.V[theId][theKey] !== 'undefined') {
		if (SCHEDULE.V[theId]['orientation'] == 'h') {
			$('#' + theId + '-' + theSection + ' ' + theTarget).css({
				'width':SCHEDULE.V[theId][theKey] + 'px'
			});
		}
		if (SCHEDULE.V[theId]['orientation'] == 'v') {
			$('#' + theId + '-' + theSection + ' ' + theTarget).css({
				'height':SCHEDULE.V[theId][theKey] + 'px'
			});
		}
	}
};

SCHEDULE.setStyleMonths = function(theId) {
	$.each(SCHEDULE.V[theId]['months'], function(key, val) {
		if (SCHEDULE.V[theId]['orientation'] == 'h') {
			$('#' + theId + ' .schedule-month[data-monthid=' + key + ']').css({
				'width': (val * Number(SCHEDULE.V[theId]['linesizeh'])) + 'px'
			})
		}
		if (SCHEDULE.V[theId]['orientation'] == 'v') {
			$('#' + theId + ' .schedule-month[data-monthid=' + key + ']').css({
				'height': (val * Number(SCHEDULE.V[theId]['linesizev'])) + 'px'
			})
		}
	});
};

SCHEDULE.setStyleEvents = function(theId) {
	$.each(SCHEDULE.V[theId]['positions'], function(key, val) {
		if (val.length > 1) {
			for (var i=0;i<val.length;i++) {
				var theOffset = 0;
				var applyOffset = 0;
				if (SCHEDULE.V[theId]['orientation'] == 'h') {
					theOffset = SCHEDULE.V[theId]['linesizev'];
				}
				if (SCHEDULE.V[theId]['orientation'] == 'v') {
					theOffset = SCHEDULE.V[theId]['linesizeh'];
				}
				if (i == 0) {
					theOffset = -1 * theOffset;
					applyOffset = 1;
				}
				if (i == 2) {
					applyOffset = 1;
				}
				if (applyOffset == 1) {
					if (SCHEDULE.V[theId]['orientation'] == 'h') {
						theOffset = Number(theOffset) + Number($('#' + theId + '-line .event[data-eventid=' + val[i] + ']').position().top);
						$('#' + theId + '-line .event[data-eventid=' + val[i] + ']').css({
							'top': theOffset + 'px'
						});
					}
					if (SCHEDULE.V[theId]['orientation'] == 'v') {
						theOffset = Number(theOffset) + Number($('#' + theId + '-line .event[data-eventid=' + val[i] + ']').position().left);
						$('#' + theId + '-line .event[data-eventid=' + val[i] + ']').css({
							'left': theOffset + 'px'
						});
					}
				}
			}
		}
	});
};

SCHEDULE.bindEvents = function(theId) {
	$('#' + theId + ' .event').off('mouseenter').on('mouseenter', function() {
		var theElement = $(this);
		$('#' + theId + ' .event').removeClass('hover');
		$('#' + theId + ' .event[data-eventid=' + theElement.data('eventid') + ']').addClass('hover');
	});
	$('#' + theId + ' .event').off('mouseleave').on('mouseleave', function() {
		$('#' + theId + ' .event').removeClass('hover');
	});
};

SCHEDULE.setObject = function(theId, timeNow) {
	SCHEDULE.V[theId] = {};
	SCHEDULE.V[theId]['positions'] = {};
	SCHEDULE.V[theId]['html'] = {};
	SCHEDULE.V[theId]['scroll'] = {};
	SCHEDULE.V[theId]['months'] = {};
	$.each(SCHEDULE.V['config'][theId][SCHEDULE.V.browsertype], function(key, val) {
		SCHEDULE.V[theId][key] = val;
	});
	SCHEDULE.V[theId]['timestart'] = SCHEDULE.convertDateToTime(SCHEDULE.V[theId]['datestart']);
	SCHEDULE.V[theId]['timeend'] = SCHEDULE.convertDateToTime(SCHEDULE.V[theId]['dateend']);
	SCHEDULE.V[theId]['timenow'] = timeNow;
	if (SCHEDULE.V[theId]['datenow'] != 0) {
		SCHEDULE.V[theId]['timenow'] = SCHEDULE.convertDateToTime(SCHEDULE.V[theId]['datenow']);
	} else {
		SCHEDULE.V[theId]['datenow'] = SCHEDULE.convertTimeToDate(SCHEDULE.V[theId]['timenow']);
		SCHEDULE.V[theId]['timenow'] = SCHEDULE.convertDateToTime(SCHEDULE.V[theId]['datenow']);
	}
};

SCHEDULE.buildHtml = function(theId) {
	var theHtml = SCHEDULE.V[theId]['html']['title'] + SCHEDULE.V[theId]['html']['pointer'] + SCHEDULE.V[theId]['html']['info'] + SCHEDULE.V[theId]['html']['line'] + SCHEDULE.V[theId]['html']['toggle'];
	return theHtml;
};

SCHEDULE.buildScroll = function(theId, theSection) {
	var theHtml = '<div class="schedule-scroll schedule-scroll-' + theSection + '">';
	if (Number(SCHEDULE.V[theId][theSection + 'controls']) == 1) {
		theHtml += '\
			<div class="schedule-scroll-controls"> \
				<p class="control control-prev">' + SCHEDULE.C['text']['control']['prev'] + '</p> \
				<p class="control control-next">' + SCHEDULE.C['text']['control']['next'] + '</p> \
			</div>';
	}
	theHtml += '\
		<div class="schedule-scroll-container" id="' + theId + '-' + theSection + '"> \
			<div class="schedule-scroll-content">' + SCHEDULE.buildEvents(theId, theSection) + '</div> \
		</div>';
	theHtml += '</div>';
	return theHtml;
};

SCHEDULE.buildEvents = function(theId, theSection) {
	var theHtml = '';
	if (theSection == 'line') {
		theHtml += SCHEDULE.LINE.buildLine(theId);
	}
	SCHEDULE.V[theId]['position'] = 0;
	$.each(SCHEDULE.V['data'][SCHEDULE.V[theId]['source']], function(key, val) {
		if (val['time'] < SCHEDULE.V[theId]['timenow']) {
			SCHEDULE.V[theId]['position']++;
		}
		if (theSection == 'info') {
			theHtml += SCHEDULE.INFO.buildHtml(theId, key, val);
		}
		if (theSection == 'line') {
			theHtml += SCHEDULE.LINE.buildHtml(theId, key, val);
		}
	});
	if (SCHEDULE.V[theId]['position'] < 0) {
		SCHEDULE.V[theId]['position'] = 0;
	}
	if (SCHEDULE.V[theId]['position'] >= SCHEDULE.V['data'][SCHEDULE.V[theId]['source']].length) {
		SCHEDULE.V[theId]['position'] = SCHEDULE.V['data'][SCHEDULE.V[theId]['source']].length-1;
	}
	return theHtml;
};

SCHEDULE.convertDateToTime = function(theDate) {
	var dateParts = theDate.split('/');
	var theDay = dateParts[0];
	var theMonth = dateParts[1]-1;
	var theYear = dateParts[2];
	return (new Date(Date.UTC(theYear,theMonth,theDay,0,0,0)).getTime());
};

SCHEDULE.convertTimeToDate = function(theTime) {
	theTime = new Date(Number(theTime));
	return theTime.getDate() + '/' + (Number(theTime.getMonth()) + Number(1)) + '/' + theTime.getFullYear();
};

SCHEDULE.convertTimeToTime = function(theTime) {
	theTime = new Date(Number(theTime));
	return theTime.getHours() + ':' + theTime.getMinutes() + ':' + theTime.getSeconds();
};

SCHEDULE.formatDate = function(theTime, theId, asText) {
	var theDate = SCHEDULE.convertTimeToDate(theTime);
	var theDateParts = theDate.split('/');
	var theFormattedDate = '';
	if (asText == 1) {
		theFormattedDate = theDateParts[0] + ' ' + SCHEDULE.C['text']['months'][SCHEDULE.V[theId]['orientation']][theDateParts[1]-1];
	} else {
		$.each(theDateParts, function(key, val) {
			if (val.length < 2) {
				val = '0' + val;
			}
			theDateParts[key] = val;
		});
		theFormattedDate = theDateParts[0] + '/' + theDateParts[1];
	}

	return theFormattedDate;
};

SCHEDULE.formatTime = function(theTime) {
	var theTime = SCHEDULE.convertTimeToTime(theTime);
	var theTimeParts = theTime.split(':');
	var theSuffix = SCHEDULE.C['text']['timeSuffix']['am'];
	$.each(theTimeParts, function(key, val) {
		if (key == 0) {
			if (val > 11) {
				theSuffix = SCHEDULE.C['text']['timeSuffix']['pm'];
			}
			if (val > 12) {
				val = val-12;
			}
		} else {
			if (val.length < 2) {
				val = '0' + val;
			}
		}
		theTimeParts[key] = val;
	});
	var theFormattedTime = theTimeParts[0] + '.' + theTimeParts[1] + theSuffix;
	return theFormattedTime;
};

// *******************************************************************************************

SCHEDULE.INFO = {};

SCHEDULE.INFO.init = function(theId) {
	SCHEDULE.INFO.reset(theId);
	if (Number(SCHEDULE.V[theId]['speedinfo']) >= 0) {
		SCHEDULE.INFO.render(theId);
	}
};

SCHEDULE.INFO.reset = function(theId) {
	SCHEDULE.V[theId]['html']['info'] = '';
};

SCHEDULE.INFO.render = function(theId) {
	SCHEDULE.V[theId]['html']['info'] = SCHEDULE.buildScroll(theId, 'info');
};

SCHEDULE.INFO.buildHtml = function(theId, key, val) {
	var theFormattedDate = SCHEDULE.formatDate(val['time'], theId, 1);
	var theFormattedTime = SCHEDULE.formatTime(val['time']);
	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		var theStyle = 'left';
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		var theStyle = 'top';
	}
	var thePosition = (Number(SCHEDULE.V[theId]['infosize']) * key);

	var theHtml = '\
		<div class="event control control-event" data-active="info" data-eventid="' + key + '" data-eventtype="' + val['type'] + '" style="' + theStyle + ':' + thePosition +'px"> \
			<span class="event-icon"></span> \
			<p> \
			<span class="event-date">' + theFormattedDate + '</span> \
			<span class="event-time">' + theFormattedTime + '</span> \
			</p> \
			<h3 class="event-title">' + val['title'] + '</h3> \
			<p class="event-description">' + val['description'] + '</p>';
	if (val['url'] != '') {
		theHtml += '\
			<p class="event-url"><a href="' + val['url'] + '" target="_blank" onclick="DESKTOP.CONTENT.mapGARequest(\'schedule-events-url\',0);">' + SCHEDULE.C['text']['view']['event'] + '</a></p>';
	}
	theHtml += '\
		</div>';
	thePosition += Number(SCHEDULE.V[theId]['infooffset']);
	theHtml = '<div class="marker" data-eventid="' + key + '" style="' + theStyle + ':' + thePosition +'px"></div>' + theHtml;
	SCHEDULE.V[theId]['infototal'] = Number(thePosition) + Number(SCHEDULE.V[theId]['infosize']);
	return theHtml;
};


// *******************************************************************************************

SCHEDULE.LINE = {};

SCHEDULE.LINE.init = function(theId) {
	SCHEDULE.LINE.reset(theId);
	if (Number(SCHEDULE.V[theId]['speedline']) >= 0) {
		SCHEDULE.LINE.render(theId);
	}
};

SCHEDULE.LINE.reset = function(theId) {
	SCHEDULE.V[theId]['html']['line'] = '';
};

SCHEDULE.LINE.render = function(theId) {
	SCHEDULE.V[theId]['html']['line'] = SCHEDULE.buildScroll(theId, 'line');
};

SCHEDULE.LINE.buildHtml = function(theId, key, val) {
	var theFormattedDate = SCHEDULE.formatDate(val['time'], theId, 1);
	var theFormattedTime = SCHEDULE.formatTime(val['time']);
	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		var theStyle = 'left';
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		var theStyle = 'top';
	}

	var dayInSeconds = 24*60*60*1000;
	var dateStart = new Date(Number(SCHEDULE.V[theId]['timestart']));
	var dateEvent = new Date(Number(val['time']));
	var daysSinceStart = Math.abs((dateStart.getTime() - dateEvent.getTime())/(dayInSeconds));

	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		var thePosition = daysSinceStart * Number(SCHEDULE.V[theId]['linesizeh']);
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		var thePosition = daysSinceStart * Number(SCHEDULE.V[theId]['linesizev']);
	}

	if (typeof SCHEDULE.V[theId]['positions'][thePosition] !== 'undefined') {
		SCHEDULE.V[theId]['positions'][thePosition].push(key);
	} else {
		SCHEDULE.V[theId]['positions'][thePosition] = [key];
	}

	var theTitleAttribute = '';
	if (Number(SCHEDULE.V[theId]['showtitleattribute']) == 1) {
		theTitleAttribute = theFormattedTime + ' ' + theFormattedDate + ' - ' + val['title'];
	}
	var theHtml = '<div class="event control control-event" data-active="line" data-eventid="' + key + '" data-eventtype="' + val['type'] + '" title="' + theTitleAttribute + '" style="' + theStyle + ':' + thePosition +'px"></div>';
	thePosition += Number(SCHEDULE.V[theId]['lineoffset']);
	theHtml = '<div class="marker" data-eventid="' + key + '" style="' + theStyle + ':' + thePosition +'px"></div>' + theHtml;
	return theHtml;
};

SCHEDULE.LINE.buildLine = function(theId) {
	var theIncrement = 1000 * 60 * 60 * 24;
	var theMonth = 0;
	var theYear = 0;
	var totalDays = 0;
	var fillDays = 0;
	var monthDays = 0;
	var theHtml = '\
		<div class="schedule-line"></div> \
		<div class="schedule-fill"></div> \
		<ul class="schedule-months">';

	for (var t=SCHEDULE.V[theId]['timestart']; t<=SCHEDULE.V[theId]['timeend']; t=Number(t)+Number(theIncrement)) {
		totalDays++;
		if (SCHEDULE.V[theId]['timenow'] >= t) {
			fillDays = totalDays;
		}
		var theTime = new Date(Number(t));
		var tempMonth = (Number(theTime.getMonth()) + Number(1));
		var tempYear = theTime.getFullYear();
		if (tempYear != theYear) {
			monthDays = 0;
			theYear = tempYear;
			if (tempMonth != theMonth) {
				theMonth = tempMonth;
			}
			theMonthId = theYear + '-' + theMonth;
			//theHtml += '<li class="schedule-month" data-monthid="' + theMonthId + '">' + SCHEDULE.C['text']['months'][SCHEDULE.V[theId]['orientation']][new Date(Number(t)).getMonth()] + ' ' + new Date(Number(t)).getFullYear() + '</li>';
			theHtml += '<li class="schedule-month" data-monthid="' + theMonthId + '">' + SCHEDULE.C['text']['months'][SCHEDULE.V[theId]['orientation']][new Date(Number(t)).getMonth()] + '</li>';
		} else if (tempMonth != theMonth) {
			monthDays = 0;
			theMonth = tempMonth;
			theMonthId = theYear + '-' + theMonth;
			//theHtml += '<li class="schedule-month" data-monthid="' + theMonthId + '">' + SCHEDULE.C['text']['months'][SCHEDULE.V[theId]['orientation']][new Date(Number(t)).getMonth()] + ' ' + new Date(Number(t)).getFullYear() + '</li>';
			theHtml += '<li class="schedule-month" data-monthid="' + theMonthId + '">' + SCHEDULE.C['text']['months'][SCHEDULE.V[theId]['orientation']][new Date(Number(t)).getMonth()] + '</li>';
		}
		monthDays++;
		SCHEDULE.V[theId]['months'][theMonthId] = monthDays;
	}

	theHtml += '</ul>';
	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		SCHEDULE.V[theId]['linefill'] = fillDays * Number(SCHEDULE.V[theId]['linesizeh']);
		SCHEDULE.V[theId]['linetotal'] = totalDays * Number(SCHEDULE.V[theId]['linesizeh']);
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		SCHEDULE.V[theId]['linefill'] = fillDays * Number(SCHEDULE.V[theId]['linesizev']);
		SCHEDULE.V[theId]['linetotal'] = totalDays * Number(SCHEDULE.V[theId]['linesizev']);
	}
	return theHtml;
};

// *******************************************************************************************

SCHEDULE.POINTER = {};

SCHEDULE.POINTER.init = function(theId) {
	SCHEDULE.POINTER.reset(theId);
	if (Number(SCHEDULE.V[theId]['pointer']) == 1) {
		SCHEDULE.POINTER.render(theId);
	}
};

SCHEDULE.POINTER.reset = function(theId) {
	SCHEDULE.V[theId]['html']['pointer'] = '';
};

SCHEDULE.POINTER.render = function(theId) {
	SCHEDULE.V[theId]['html']['pointer'] = SCHEDULE.POINTER.buildHtml();
};

SCHEDULE.POINTER.buildHtml = function() {
	var theHtml = '<div class="schedule-pointer"></div>';
	return theHtml;
};

// *******************************************************************************************

SCHEDULE.SCROLL = {};

SCHEDULE.SCROLL.init = function(theId, theSection) {
	SCHEDULE.SCROLL.reset(theId, theSection);
	if ($('#' + theId + '-' + theSection).is(':visible')) {
		SCHEDULE.SCROLL.render(theId, theSection);
		SCHEDULE.SCROLL.bindControls(theId, theSection);
	}
};

SCHEDULE.SCROLL.reset = function(theId, theSection) {
	if (typeof SCHEDULE.V[theId]['scroll'][theSection] !== 'undefined') {
		if (SCHEDULE.V[theId]['scroll'][theSection] != null) {
			if (viewLegacy == 0) {
				SCHEDULE.V[theId]['scroll'][theSection].destroy();
			}
			SCHEDULE.V[theId]['scroll'][theSection] = null;
		}
	}
};

SCHEDULE.SCROLL.render = function(theId, theSection) {
	if (viewLegacy == 0) {
		var theOptions = {
			bounce:false,
			hScrollbar:false,
			momentum:true,
			onScrollEnd: function() {
				SCHEDULE.SCROLL.updatePosition(theId, theSection)
			},
			onTouchEnd: function() {
				SCHEDULE.SCROLL.setActive(theId, theSection);
			},
			snap:'.marker',
			vScrollbar:false,
			wheelAction:'none'
		}
		if (SCHEDULE.V[theId]['orientation'] == 'h') {
			theOptions['vScroll'] = false;
			theOptions['hScroll'] = true;
		} else {
			theOptions['vScroll'] = true;
			theOptions['hScroll'] = false;
		}
		SCHEDULE.V[theId]['scroll'][theSection] = new iScroll(theId + '-' + theSection, theOptions);
	} else {
		SCHEDULE.V[theId]['scroll'][theSection] = {};
		SCHEDULE.V[theId]['scroll'][theSection]['currPageX'] = 0;
		SCHEDULE.V[theId]['scroll'][theSection]['currPageY'] = 0;
	}

	if (typeof SCHEDULE.V['overrides']['position'][theId] !== 'undefined') {
		SCHEDULE.V[theId]['position'] = SCHEDULE.V['overrides']['position'][theId];
	} else {
		SCHEDULE.V['overrides']['position'][theId] = SCHEDULE.V[theId]['position'];
	}

	SCHEDULE.SCROLL.scrollToPage(theId, theSection, SCHEDULE.V[theId]['position']);
	SCHEDULE.V[theId]['active'] = theSection;
};

SCHEDULE.SCROLL.updatePosition = function(theId, theSection) {
	if (typeof SCHEDULE.V[theId]['scroll'][theSection] !== 'undefined') {
		if (SCHEDULE.V[theId]['orientation'] == 'h') {
			SCHEDULE.V[theId]['position'] = SCHEDULE.V[theId]['scroll'][theSection].currPageX;
		}
		if (SCHEDULE.V[theId]['orientation'] == 'v') {
			SCHEDULE.V[theId]['position'] = SCHEDULE.V[theId]['scroll'][theSection].currPageY;
		}
	}
	SCHEDULE.V['overrides']['position'][theId] = SCHEDULE.V[theId]['position'];
	$('#' + theId + ' .schedule-scroll-' + theSection + ' .event').removeClass('active');
	$('#' + theId + ' .schedule-scroll-' + theSection + ' .event[data-eventid=' + SCHEDULE.V[theId]['position'] + ']').addClass('active');

	$.each(SCHEDULE.V[theId]['scroll'], function(key, val) {
		if (key != SCHEDULE.V[theId]['active']) {
			if (SCHEDULE.V[theId]['orientation'] == 'h') {
				if (SCHEDULE.V[theId]['scroll'][key].currPageX != SCHEDULE.V[theId]['position']) {
					SCHEDULE.SCROLL.scrollToPage(theId, key, SCHEDULE.V[theId]['position']);
				}
			}
			if (SCHEDULE.V[theId]['orientation'] == 'v') {
				if (SCHEDULE.V[theId]['scroll'][key].currPageY != SCHEDULE.V[theId]['position']) {
					SCHEDULE.SCROLL.scrollToPage(theId, key, SCHEDULE.V[theId]['position']);
				}
			}
		}
	});
	$('#' + theId + ' .schedule-scroll-' + theSection + ' .control').removeClass('disabled');
	if (SCHEDULE.V[theId]['position'] == 0) {
		$('#' + theId + ' .schedule-scroll-' + theSection + ' .control-prev').addClass('disabled');
	}
	if (SCHEDULE.V[theId]['position'] == (SCHEDULE.V['data'][SCHEDULE.V[theId]['source']].length-1)) {
		$('#' + theId + ' .schedule-scroll-' + theSection + ' .control-next').addClass('disabled');
	}
};

SCHEDULE.SCROLL.setActive = function(theId, theSection) {
	SCHEDULE.V[theId]['active'] = theSection;
};

SCHEDULE.SCROLL.bindControls = function(theId, theSection) {
	var selection = $('#' + theId + ' .schedule-scroll-' + theSection + ' .control-prev');
	selection.off('click').on('click', function() {
		var theElement = $(this);
		if (!theElement.hasClass('disabled')) {
			SCHEDULE.SCROLL.setActive(theId, theSection);
			SCHEDULE.SCROLL.scrollToPage(theId, theSection, 'prev');
			DESKTOP.CONTENT.mapGARequest(theId,0);
		}
	});

	var selection = $('#' + theId + ' .schedule-scroll-' + theSection + ' .control-next');
	selection.off('click').on('click', function() {
		var theElement = $(this);
		if (!theElement.hasClass('disabled')) {
			SCHEDULE.SCROLL.setActive(theId, theSection);
			SCHEDULE.SCROLL.scrollToPage(theId, theSection, 'next');
			DESKTOP.CONTENT.mapGARequest(theId,0);
		}
	});

	var selection = $('#' + theId + ' .control-event');
	selection.off('click').on('click', function(e) {
		var theElement = $(this);
		if(theElement.hasClass('locked')) {
			e.preventDefault();
			return false;
		} else {
			if (!theElement.hasClass('disabled')) {
				setTimeout(function() {
					SCHEDULE.V[theId]['active'] = theElement.data('active');
					SCHEDULE.V[theId]['position'] = theElement.data('eventid');
					if (e.target.tagName.toLowerCase() != 'a') {
						DESKTOP.CONTENT.mapGARequest(theId,0);
					}					
					SCHEDULE.SCROLL.scrollToPage(theId, SCHEDULE.V[theId]['active'], SCHEDULE.V[theId]['position']);
				}, SCHEDULE.C['delay']);
			}
			theElement.addClass('locked');
			setTimeout(function() {
				theElement.removeClass('locked');
			}, 500);
		}
	});
	new MOBILE.BindNoClickDelay(selection);
};

SCHEDULE.SCROLL.scrollToPage = function(theId, theSection, thePage) {
	if (viewLegacy == 1) {
		if (thePage == 'next') {
			thePage = Number(SCHEDULE.V[theId]['position']) + Number(1);
		}
		if (thePage == 'prev') {
			thePage = Number(SCHEDULE.V[theId]['position']) - Number(1);
		}
		if (SCHEDULE.V[theId]['orientation'] == 'h') {
			SCHEDULE.V[theId]['scroll'][theSection].currPageX = thePage;
		}
		if (SCHEDULE.V[theId]['orientation'] == 'v') {
			SCHEDULE.V[theId]['scroll'][theSection].currPageY = thePage;
		}
	}
	if (SCHEDULE.V[theId]['orientation'] == 'h') {
		if (viewLegacy == 0) {
			SCHEDULE.V[theId]['scroll'][theSection].scrollToPage(thePage, 0, Number(SCHEDULE.V[theId]['speed' + theSection]));
		} else {
			$('#' + theId + '-' + theSection).scrollTo('.marker:eq(' + thePage + ')', {
				'onAfter':function(){
					SCHEDULE.SCROLL.updatePosition(theId, theSection);
				},
				'axis':'x',
				'duration':Number(SCHEDULE.V[theId]['speed' + theSection])
			});
		}
	}
	if (SCHEDULE.V[theId]['orientation'] == 'v') {
		if (viewLegacy == 0) {
			SCHEDULE.V[theId]['scroll'][theSection].scrollToPage(0, thePage, Number(SCHEDULE.V[theId]['speed' + theSection]));
		} else {
			$('#' + theId + '-' + theSection).scrollTo('.marker:eq(' + thePage + ')', {
				'onAfter':function(){
					SCHEDULE.SCROLL.updatePosition(theId, theSection);
				},
				'axis':'y',
				'duration':Number(SCHEDULE.V[theId]['speed' + theSection])
			});
		}
	}
};

// *******************************************************************************************

SCHEDULE.TITLE = {};

SCHEDULE.TITLE.init = function(theId) {
	SCHEDULE.TITLE.reset(theId);
	SCHEDULE.TITLE.render(theId);
};

SCHEDULE.TITLE.reset = function(theId) {
	SCHEDULE.V[theId]['html']['title'] = '';
};

SCHEDULE.TITLE.render = function(theId) {
	if (SCHEDULE.V[theId]['title'] != '') {
		if ($('#' + theId + ' .schedule-title').size() > 0) {
			$('#' + theId + ' .schedule-title').remove();
		}
		SCHEDULE.V[theId]['html']['title'] = SCHEDULE.TITLE.buildHtml(SCHEDULE.V[theId]['title']);
	}
};

SCHEDULE.TITLE.buildHtml = function(theTitle) {
	var theHtml = '<div class="schedule-title"><h2>' + theTitle + '</h2></div>';
	return theHtml;
};

// *******************************************************************************************

SCHEDULE.TOGGLE = {};

SCHEDULE.TOGGLE.init = function(theId) {
	SCHEDULE.TOGGLE.reset(theId);
	SCHEDULE.TOGGLE.render(theId);
};

SCHEDULE.TOGGLE.reset = function(theId) {
	SCHEDULE.V[theId]['html']['toggle'] = '';
};

SCHEDULE.TOGGLE.render = function(theId) {
	if (Number(SCHEDULE.V[theId]['speedtoggle']) >= 0) {
		SCHEDULE.V[theId]['html']['toggle'] = SCHEDULE.TOGGLE.buildHtml();
	} else {
		if (SCHEDULE.V[theId]['openonload'] == 1) {
			$('#' + theId).addClass('schedule-open');
		} else {
			$('#' + theId).addClass('schedule-closed');
		}
	}
};

SCHEDULE.TOGGLE.buildHtml = function() {
	var theHtml = '\
		<div class="schedule-toggle"> \
			<p class="control control-open">' + SCHEDULE.C['text']['control']['open'] + '</p> \
			<p class="control control-close">' + SCHEDULE.C['text']['control']['close'] + '</p> \
		</div>';
	return theHtml;
};

SCHEDULE.TOGGLE.bindControls = function(theId) {
	if (typeof SCHEDULE.V['overrides']['openonload'][theId] !== 'undefined') {
		SCHEDULE.V[theId]['openonload'] = SCHEDULE.V['overrides']['openonload'][theId];
	} else {
		SCHEDULE.V['overrides']['openonload'][theId] = SCHEDULE.V[theId]['openonload'];
	}

	if (Number(SCHEDULE.V[theId]['openonload']) == 0) {
		SCHEDULE.TOGGLE.hideTimeline(theId);
	} else {
		SCHEDULE.TOGGLE.showTimeline(theId);
	}

	var selection = $('#' + theId + ' .control-open');
	selection.off('click').on('click', function() {
		SCHEDULE.TOGGLE.showTimeline(theId);
		SCHEDULE.V['overrides']['openonload'][theId] = 1;
	});

	var selection = $('#' + theId + ' .control-close');
	selection.off('click').on('click', function() {
		SCHEDULE.TOGGLE.hideTimeline(theId);
		SCHEDULE.V['overrides']['openonload'][theId] = 0;
	});
};

SCHEDULE.TOGGLE.showTimeline = function(theId) {
	$('#' + theId + ' .control-open').hide();
	if ($('html').hasClass('csstransitions')) {
		$('#' + theId + ' .schedule-scroll-line').css({
			'height':SCHEDULE.V[theId]['toggle-height'] + 'px',
			'-webkit-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-moz-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-ms-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-o-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease'
		});
		$('#' + theId).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd msTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd msTransitionEnd', function() {
			$('#' + theId + ' .control-close').show();
			$('#' + theId + ' .schedule-pointer').show();
			$('#' + theId).removeClass('schedule-closed');
			$('#' + theId).addClass('schedule-open');
		});
	} else {
		$('#' + theId + ' .schedule-scroll-line').slideDown(SCHEDULE.V[theId]['speedtoggle'], function() {
			$('#' + theId + ' .control-close').show();
			$('#' + theId + ' .schedule-pointer').show();
			$('#' + theId).removeClass('schedule-closed');
			$('#' + theId).addClass('schedule-open');
		});
	}
	if (viewLegacy == 1) {
		SCHEDULE.SCROLL.scrollToPage(theId, 'line', SCHEDULE.V[theId]['position']);
	}
};

SCHEDULE.TOGGLE.hideTimeline = function(theId) {
	$('#' + theId + ' .control-close').hide();
	if ($('html').hasClass('csstransitions')) {
		SCHEDULE.V[theId]['toggle-height'] = DEFAULT.FUNCTIONS.getDimension('height', $('#' + theId + ' .schedule-scroll-line'));
		$('#' + theId + ' .schedule-scroll-line').css({
			'height':0,
			'-webkit-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-moz-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-ms-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'-o-transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease',
			'transition':'height ' + SCHEDULE.V[theId]['speedtoggle'] + 'ms ease'
		});
		$('#' + theId).off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd msTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd msTransitionEnd', function() {
			$('#' + theId + ' .control-open').show();
			$('#' + theId + ' .schedule-pointer').hide();
			$('#' + theId).removeClass('schedule-open');
			$('#' + theId).addClass('schedule-closed');
		});
	} else {
		$('#' + theId + ' .schedule-scroll-line').slideUp(SCHEDULE.V[theId]['speedtoggle'], function() {
			$('#' + theId + ' .control-open').show();
			$('#' + theId + ' .schedule-pointer').hide();
			$('#' + theId).removeClass('schedule-open');
			$('#' + theId).addClass('schedule-closed');
		});
	}
};

// *******************************************************************************************

SCHEDULE.V.data = {
	'events': scheduleJson,
	'judging': []
};

// *******************************************************************************************
// *******************************************************************************************
// *******************************************************************************************
// *******************************************************************************************
