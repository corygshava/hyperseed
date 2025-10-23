let launchdate = "2025-07-31T03:00:00";
let countdowninter = undefined;

// data for the hero animation slideshow
let sections = [
	{
		title: "WHO ARE WE",
		description: "We are an indigenous peoples global prayer and missions movement initiative. We are a hub that seeks to coordinate and network the body of Christ into fulfilling the great commission call and hasten the return of Jesus Christ Our Lord!",
		imageid:1
	},
	{
		title: "MISSIONS MOBILIZATION",
		description: "Destiny Baraka House exists to mobilize believers from all nations to reach all nations. Our mission is clear: prayer is the foundation, and evangelism is the expression. Through our Throne Room House of Prayer, weekly and monthly outreaches, and annual missions, we are committed to making Jesus known in every corner of the world.",
		imageid:2
	},
	{
		title: "INDIGENOUS PEOPLES' MISSIONS MOVEMENT",
		description: "We champion indigenous leadership in prayer and missions through strategic partnerships, localized discipleship, and contextualized outreach initiatives that empower communities from within.",
		imageid:3
	},
	{
		title: "CROSS-CULTURAL MISSIONARIES",
		description: "We believe in equipping believers through hands-on mission experiences. Our Divine Exchange Programs expose believers to different cultures, strengthening their call to missions. \"Breaking barriers, building bridges.\" (Romans 1:16)",
		imageid:4
	},
	{
		title: "EVANGELISM",
		description: "Using a holistic approach, we are simply seeking to fulfill the Great Commission call and this great commandment on a monthly basis.",
		imageid:5
	},
	{
		title: "SCHOOL OF MINISTRY",
		description: "Our School of Ministry equips leaders with sound doctrine, spiritual disciplines, and practical tools for effective service in their communities and beyond.",
		imageid:6
	},
	{
		title: "SCHOOL OF MUSIC",
		description: "We train worship leaders and musicians to flow prophetically, minister skillfully, and cultivate atmospheres that invite God's presence across cultures and generations.",
		imageid:7
	},
	{
		title: "DESTINY BARAKA TV",
		description: "Our media arm broadcasts spirit-led teachings, testimonies, and live events to inspire, equip, and mobilize a global audience for prayer and missions.",
		imageid:8
	},
	{
		title: "REACH US TODAY",
		description: `
			<p><i class="fa fa-envelope"></i> destinybarakahouse@gmail.com </p>
			<p><i class="fa fa-phone"></i> +254 748 214 987 </p>
			<p><i class="fa fa-phone"></i> +254 781 125 979</p>`,
		imageid:9
	}
];

// data for animation keyframes
let timing2 = {
	duration: 1200,
	easing: "ease-out",
	fill: "forwards"
}
let slideupAnim = [
	{translate: '0 20px',opacity: 0},
	{translate: '0 0',opacity: 1}
]
let slideupAnim2 = [
	{translate: '0 20px',opacity: 0,letterSpacing: '10px'},
	{translate: '0 0',opacity: 1,letterSpacing: '0'}
]
let opac = [
	{opacity: 0},
	{opacity: 1}
]
let longen = [
	{width: "0%"},
	{width: "100%"}
]
let entre = [
	{scale:1.3,opacity: 0},
	{scale:1.0,opacity: 1}
]

function makecountdown(holder,thedate) {
	thedate = thedate == undefined ? launchdate : thedate;

	let targetDate = new Date(thedate).getTime();

	if(holder == undefined){
		console.log("define a holder for the elements first");
		return;
	}

	let theholder = typeof(holder) == "string" ? document.querySelector(holder) : holder;

	const updateCountdown = () => {
		const now = new Date().getTime();
		const gap = targetDate - now;

		if (gap <= 0) {
			document.querySelector(".cw-countdown").innerHTML = "<h3>Countdown Complete</h3>";
			return;
		}

		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		const days = Math.floor(gap / day);
		const hours = Math.floor((gap % day) / hour);
		const minutes = Math.floor((gap % hour) / minute);
		const seconds = Math.floor((gap % minute) / second);

		let outres = `
			<div class="smallcard">
				<div class="h2 themetxt" id="days">${days}</div>
				<div class="label">Days</div>
			</div>
			<div class="smallcard">
				<div class="h2 themetxt" id="hours">${String(hours).padStart(2, '0')}</div>
				<div class="label">Hours</div>
			</div>
			<div class="smallcard">
				<div class="h2 themetxt" id="minutes">${String(minutes).padStart(2, '0')}</div>
				<div class="label">Minutes</div>
			</div>
			<div class="smallcard">
				<div class="h2 themetxt" id="seconds">${String(seconds).padStart(2, '0')}</div>
				<div class="label">Seconds</div>
			</div>`;

		theholder.innerHTML = outres;
		document.getElementById("days").textContent = days;
		document.getElementById("hours").textContent = String(hours).padStart(2, '0');
		document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
		document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
	};

	if(countdowninter != undefined){
		clearInterval(countdowninter);
	}

	countdowninter = setInterval(updateCountdown,1000);
}
