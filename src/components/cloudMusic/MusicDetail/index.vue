<template>
    <div class='detailWrap'>
        <MusicDetailHeader />
        <DetailContentWrap/>
    </div>
</template>

<script>
import MusicDetailHeader from "@/components/cloudMusic/MusicDetail/Header";
import DetailContentWrap from "@/components/cloudMusic/MusicDetail/ContentWrap";
export default {
    name:'musicDetail',
    components:{
        MusicDetailHeader,
        DetailContentWrap,
    },
    
}
</script>

<style scoped>
.detailWrap{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:87%;
    background: linear-gradient(#ccc,white);
    z-index: 100;
    overflow: auto;
}

.detailWrap::-webkit-scrollbar{
    width:0
}
</style>