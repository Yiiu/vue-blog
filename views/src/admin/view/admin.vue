<template>
    <div class="admins">
        <headers></headers>
        <div class="admin-main">
            <transition name="op" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import headers from "../../components/header-admin"

export default {
    components:{
        headers
    },
}
</script>
<style lang="less">
.admins {
    width: 100%;
    height: 100%;
}

.admin-main {
    box-sizing: border-box;
    h2.title {
        font-size: 22px;
        font-weight: 400;
        margin-bottom: 12px;
    }
    .box {
        .content{
            transition: .3s all;
            background: #fff;
            padding: 24px;
            height: 100%;
            border: 1px solid #d6d6d6;
            border-radius: 2px;
            &:hover {
                box-shadow: 0 10px 15px -5px #ccc
            }
        }
    }
}

.add-article {
    margin: 0 auto;
    >.img {
        cursor: pointer;
        background: #efefef;
        margin-bottom: 24px;
        .coverimg {
            display: block;
            width: 100%;
        }
        p {
            padding: 12px;
            i {
                font-size: 42px;
            }
            text-align: center;
            font-size: 28px;
            color: #ccc;
        }
    }
    >.type {
        margin-bottom: 24px;
        font-size: 24px;
        .content {
            display: flex;
            align-items: center;
            p.title {
                color: #a9a9a9;
                font-size: 24px;
                margin-right: 24px;
            }
            .y-radio-group {
                margin-left: 24px;
                display: flex;
                align-items: center;
                .y-radio {
                    margin: 0 4px;
                }
                .y-btn {
                    border: 1px #ccc solid;
                    border-radius: 2px;
                }
            }
        }
    }
    >.title {
        margin-bottom: 24px;
        input {
            width: 100%;
            font-size: 32px;
            outline: none;
            border: none;
            resize:none;
            height: 1.3em;
        }
    }
    >.content {
        textarea {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            font-size: 16px;
            outline: none;
            border: none;
            resize:none;
            height: 1.3em;
            min-height: 260px;
        }
    }
    >.tags {
        margin-bottom: 24px;
        .content {
            display: flex;
            .tag {
                display: block;
                height: 22px;
                margin-bottom: 12px;
            }
            input {
                font-size: 18px;
                outline: none;
                border: none;
                resize: none;
                height: 1.3em;
            }
        }
    }
}
.y-dialog-body {
    textarea {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        border: 1px solid #ccc;
        font-size: 24px;
        border-radius: 4px;
        padding: 4px 6px;
        outline: none;
    }
}
</style>
