<template>
    <Transition name="expand" @enter="enter" @afterEnter="afterEnter" @leave="leave">
        <slot name="collapse-content">
            <div v-show="show" class="collapse-content">
                <slot></slot>
            </div>
        </slot>
    </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    show?: boolean
}>(), {
})

function enter(el: Element) {
    const element = el as HTMLElement
    const width = getComputedStyle(element).width
    element.style.width = width
    element.style.width = 'auto'
    element.style.visibility = 'hidden'
    element.style.height = 'auto'

    const height = getComputedStyle(element).height
    element.style.visibility = 'unset'
    element.style.height = '0'

    requestAnimationFrame(() => {
        element.style.height = height
    })

    return getComputedStyle(element).height
}

function afterEnter(el: Element) {
    const element = el as HTMLElement
    element.style.height = 'auto'
}

function leave(el: Element) {
    const element = el as HTMLElement
    const height = getComputedStyle(element).height

    element.style.height = height
    requestAnimationFrame(() => {
        element.style.height = '0'
    })
    return getComputedStyle(element).height
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: height 0.30s;
    overflow: hidden;

}

.expand-enter-to,
.expand-leave-to {
    height: 0;

}
</style>