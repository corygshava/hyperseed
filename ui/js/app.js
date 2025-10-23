const fetch_bypass = "fetch_bypass_000";
const key = 'h_seed_lastlike';
let holder = undefined;

curfun = fetch_bypass;
if(window[curfun] == undefined){
	window[curfun] = async (p,dta = {},mt = 'POST',silent = false) => {
		try{
			alert_silent({to: p,data: dta,method: mt});
			// # wdawda
			// dta[fetch_identifier] = 'yes';
			// alert_dark(JSON.stringify(dta));

			let headers = {
				'X-Requested-With' : 'XMLHttpRequest',
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
			};
			let body = mt == "GET" || mt == 'HEAD' ? null : JSON.stringify(dta);

			// alert_info(JSON.stringify(headers));
			// console.log(`${fetch_bypass}: `,dta);

			let req = await fetch(p,{
				method: mt.toUpperCase(),
				headers: headers,
				// credentials: 'same-origin',
				body: body,
			});

			if(!req.ok){
				throw new Error(`[${req.status}] -> ${req.statusText}`);
			}

			return await req.json();
		} catch (error){
			if(!silent) alert_danger(error);
			console.log(error);
			throw error;
		}
	}
}

function responseHandler(w,callback,args = undefined) {
	console.log('response_handler: ',w);
	if(w.success){
		if(w.result){
			alert_success(w.message);

			if(callback != undefined || typeof callback === 'function'){
				args = args ?? w;
				callback(args);
			}
		} else {
			alert_warning(w.message);
		}
	} else {
		alert_warning('sorry, your session expired. lets fix that',12);
		setTimeout(() => {
			// window.location.reload();
		}, 3000);
	}
}

function update_visits() {
	window[fetch_bypass]('./logvisits',{'res' : document.title},'POST',true);
}

function initlikers(el) {
	// get holder
	holder = document.querySelector('[data-role="likers"]');
	let btns = holder.querySelectorAll('[data-likeapp]');

	if(check_savedlikes()){
		hidelikers();
		return;
	}

	btns.forEach(el => {
		el.addEventListener('click',e => {
			let con = el.dataset.likeapp == "true";

			addlike(con);
		})
	})

	let addlike = (w) => {
		let act = w ? "liked" : "disliked";

		const afterwork = (dta) => {
			console.log(dta);
			alert_info(`page ${act} successfully`);
			make_rec(w);
			hidelikers();
		}

		window[fetch_bypass]('./likepage',{'islike' : w,'page' : document.title}).then(d => {
			responseHandler(d,afterwork);
		});
	}
}

function check_savedlikes(){
	const data = localStorage.getItem(key);

	if (data != undefined) {
		try {
			const { liketime } = JSON.parse(data);
			const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
			if (Date.now() - liketime >= twoDaysMs) {
				localStorage.removeItem(key);
				return false;
			}

			return true;
		} catch (e) {
			// Invalid data; optionally clean it
			localStorage.removeItem(key);

			return false;
		}
	}
}

function make_rec(c){
	let act = c ? "like" : "dislike";
	let date = new Date();
	let dta = {'liketime': date.getTime(),'lastact':act};

	localStorage.setItem(key,JSON.stringify(dta));
}

function hidelikers() {
	holder.animate([
		{'opacity' : 1},
		{'opacity' : 0},
	],{
		duration: 400,
		easing: 'ease-out',
		fill: 'forwards'
	});
}

// /*
window.addEventListener('load',() => {
	update_visits();
	initlikers();
})
// */