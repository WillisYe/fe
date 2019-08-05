// vue指令
const tableScroll = {
    inserted: function(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
            let sign = 800
            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
            if (scrollDistance <= sign) {
                binding.value()
            }
        })
    }
}
const tableScrollxy = {
    inserted: function(el, binding, vnode) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
            binding.value()
        })
    }
}

export default {
    tableScroll,
    tableScrollxy
}