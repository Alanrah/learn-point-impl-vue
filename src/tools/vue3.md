### vue3 新特性
* script setup、defineProps
* defineCustomElement 创建自定义元素
* effectScopeAPI，支持使用onTrack/onTrigger调试computed
```typescript
    <script setup lang="ts">
    // 3.2以前需导入defineEmit和defineProps，3.2以后自动导入defineEmits和defineProps，defineEmit被废弃
    import { defineProps, ref as r, defineEmit } from 'vue';
    // import myDir from './my-dir'; 组件不用注册，直接在模板里面用
    const color = 'red'
    const height = r('10px')
    // 编译的时候会把这些变量转换为props{}/emits:{}并return
    defineProps({
        foo: {
            type: String,
            default: () => 1,
        }
    });
    const emit = defineEmit(['foo', 'bar']);
    ref: a = 1, b = 2, c = 3;
    function get() {
    return a + 1; // 不用写.value
    }

    </script>
    <script>
    export const n = 1
    </script>
```
* v-model
* directive 的生命周期变化，v-memo 新指令
* style-v-bind
* style 深度选择器 >>> ---> :deep(), style module, :global选择器