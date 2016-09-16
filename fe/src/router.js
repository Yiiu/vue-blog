export default (app) => {
	app.map({
		"/":{
			name:"index",
			component: (resolve) => {
				require(["./index"], resolve)
			}
		},
		"/test":{
			name:"test",
			component: (resolve) => {
				require(["./test"], resolve)
			}
		}
	})
}