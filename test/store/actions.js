export const alertshow = function({dispatch, state},show){
    dispatch("ALERTSHOW",show)
}
export const alerttitle = function({dispatch, state},title){
    dispatch("ALERTTITLE",title)
}
export const alertstyle = function({dispatch, state},style){
    dispatch("ALERTSTYLE",style)
}
export const adminnav = function({dispatch, state},style){
    dispatch("ADMINNAV")
}
