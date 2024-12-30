import { Ref, computed, isRef, onMounted, reactive, ref, watch } from "vue";
import anime from "animejs/lib/anime.es.js";
interface TransformAnimeOption {
  target: Ref<HTMLElement>;
  to: Ref<HTMLElement> | { x: number; y: number };
  duration?: number;
}

export function useTransform(opt: TransformAnimeOption) {
  const { target, to, duration = 300 } = opt;
  // 目的地
  const toPosition = computed(() => {
    return isRef(to) ? getDomXY(to) : to;
  });
  const countTime = ref(0);
  const start = () => {
    const { x, y } = getDomXY(target);
    const { x: x2, y: y2 } = toPosition.value;
    let translate = { x: x2 - x, y: y2 - y };
    anime({
      targets: target.value,
      translateX: translate.x,
      translateY: translate.y,
      duration,
      rotate: "+=3turn",// 转3圈
      borderRadius: ['0%', '100%'],
      width: ['200px', '50px'],
      height: ['200px', '50px'], 
      complete: () => {
          console.log('ok')
      }
    });
  };
  return {
    start,
  };
}
function getDomXY(dom: Ref<HTMLElement>) {
  const { x, y } = dom.value.getBoundingClientRect();
  return { x, y };
}
