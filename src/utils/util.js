// Various useful utility functions

export function getCookie(name) {
	// Returns the value of a Cookie by name, blank if it doesn't exist
	const cookieName = name + '='
	const allCookies = decodeURIComponent(document.cookie).split(';')
	for (let cookie of allCookies) {
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1)		// Cookies may be split by just ';' or by '; '
		}
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length);
		}
	}
	return '';
}

export function setCookie(name, value, expiresInDays = null, path = '/', sameSite = 'Lax', secure = false) {
	// Sets a cookie with a value that expires in some days (or the Session if not specified)
	// Can set a path, SameSite or Secure. Delete a cookie by using negative expiration days.
	let expires = ''
	if (expiresInDays) {
		let today = new Date()
		today.setTime(today.getTime() + (1000 * 60 * 60 * 24 * expiresInDays))
		expires = "; Expires="+ today.toUTCString()
	}
	document.cookie = name + "=" + encodeURIComponent(value) + expires + '; Path=' + path + '; SameSite=' + sameSite + (secure ? ' Secure' : '')
}

// Simple async API wrapper for fetch(), can accept a Bearer token, AbortController, and customizations.
// Otherwise assumes application/json, the body can be an Object or a String. Returns:
// Object of: {success, response, data}, if success is true then data object has results, otherwise
// response object has details, including ._caught if a serious error was thrown.
export async function apiFetch ({method = 'GET', url, options = {}, token, body, headers = {}, controller, discard = false}) {
	// Example:
	// const controller = new AbortController()
	// setTimeout(() => controller.abort(), 2000)	// 2 second timeout
	// const {success, response, data} = await apiFetch({method: 'POST', url: '/users/login', body, controller})
	// if (success) {use(data)} else {alert(response)}
	const defaults = {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		signal: controller ? controller?.signal : undefined,
		body: typeof body === 'object' ? JSON.stringify(body) : body
	}
	if (token) {
		defaults.headers.Authorization = `Bearer ${token}`
	}
	defaults.headers = {...defaults.headers, ...headers}
	options = {...defaults, ...options}

	let response = {}
	let data = {}
	try {
		response = await window.fetch(url, options)
		if (!discard) {
			data = await response.json()
		}
		if (response.ok) {
			return {success: true, response, data};
		} else {
			response._caught = false
			return {success: false, response, data};
		}
	} catch (err) {
		console.log('!ERROR! An unexpected error was caught:')			// eslint-disable-line no-console
		console.dir(err)												// eslint-disable-line no-console
		response._caught = true				// For some reason unable ...spread the response
		response.code = err.code
		response.message = err.message
		response.name = err.name
		response.code = err.code
		response.err = err
		return {success: false, response};
		// return {success: false, response: {...response, _caught: true, code: err.code, message: err.message, name: err.name, err}};
	}
}
