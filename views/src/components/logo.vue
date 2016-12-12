<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370.55 211" :style="{width:width}">
        <title>logo</title>
            <animate id="x" attributeName="x" to="60" begin="0s" dur="3s" fill="freeze" />
            <animate attributeName="y" to="100" begin="x.end" dur="3s" fill="freeze" />
        <g id="1" data-name="图层 1">
            <line 
                x1="365.94" 
                y1="151.7" 
                x2="180.01" 
                y2="14.9" 
                style="fill:none;stroke-miterlimit:10;stroke-width:14px"
                :style="{stroke:color}"
            />
        </g>
        <g id="2" data-name="图层 3">
            <line 
                x1="205.59" 
                y1="4.49" 
                x2="2.26" 
                y2="103.75" 
                style="fill:none;stroke-miterlimit:10;stroke-width:14px"
                :style="{stroke:color}"
            />
        </g>
        <g id="3" data-name="图层 4">
            <line 
                x1="205.37"
                y1="206.53" 
                x2="2.26" 
                y2="103.75" 
                style="fill:none;stroke-miterlimit:10;stroke-width:14px"
                :style="{stroke:color}"
            />
        </g>
        <g id="4" data-name="图层 2">
            <line 
                x1="367.58" 
                y1="54.64" 
                x2="178.37" 
                y2="193.86" 
                style="fill:none;stroke-miterlimit:10;stroke-width:14px"
                :style="{stroke:color}"
            />
        </g>
    </svg>
</template>
<script>
export default {
    props:{
        width:Number,
        color:{
            type:String,
            default:"#231815"
        },
    }
}
</script>