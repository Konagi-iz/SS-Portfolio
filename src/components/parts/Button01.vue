<script setup>
import IconCircle from '~icons/svg/ico-circle';
import IconAngleRight from '~icons/svg/ico-angle-right';

const props = defineProps({
	isBig: Boolean,
	color: String,
	txt: String,
});
</script>

<template>
	<div class="btn-01" :class="{ 'btn-01--big': isBig, 'btn-01--orange': color === 'orange' }">
		<p class="btn-01__txt font-en" v-html="txt"></p>
		<div class="btn-01__icon">
			<IconCircle class="btn-01-circle__back"></IconCircle>
			<IconCircle class="btn-01-circle__front"></IconCircle>
			<IconAngleRight></IconAngleRight>
		</div>
	</div>
</template>

<style scoped lang="scss">
.btn-01 {
	display: flex;
	align-items: center;
	gap: 18px;
	@include media_narrow {
		gap: vw(14);
	}
	.btn-01__txt {
		color: $c-white;
		@include fz(18);
		font-weight: 400;
		line-height: 1.5;
		@include media_narrow {
			@include fz(14);
		}
	}
	.btn-01__icon {
		position: relative;
	}
	.btn-01-circle__back {
		width: 30px;
		height: auto;
		transition: transform 0.9s $e-out-expo, opacity 0.9s $e-out-expo;
		@include media_narrow {
			width: vw(20);
		}
		:deep(.ico-circle__path) {
			stroke: $c-lightgray;
			stroke-width: 2px;
			@include media_narrow {
				stroke-width: vw(3);
			}
		}
	}
	.btn-01-circle__front {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		width: 30px;
		height: auto;
		@include media_narrow {
			width: vw(20);
		}
		:deep(.ico-circle__path) {
			stroke: $c-orange;
			stroke-width: 3px;
			stroke-dasharray: 0 218;
			transition: stroke-dasharray 0.9s $e-out-expo;
			@include media_narrow {
				stroke-width: vw(3);
			}
		}
	}
	.ico-angle-right {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 11px;
		height: auto;
		@include media_narrow {
			width: vw(10);
		}
	}
	:deep(.ico-angle-right__path) {
		stroke: $c-orange;
	}

	/* hover ------------ */
	@include media_hover {
		&:hover .btn-01-circle__front :deep(.ico-circle__path) {
			stroke-dasharray: 218 218;
		}
		&:hover .btn-01-circle__back {
			transform: scale(1.1);
			opacity: 0;
		}
	}

	/* orange ------------ */
	&.btn-01--orange .btn-01__txt {
		color: $c-orange;
	}

	/* big ------------ */
	&.btn-01--big {
		gap: 22px;
		@include media_narrow {
			gap: vw(18);
		}
		.btn-01__txt {
			@include fz(36);
			line-height: 1.1;
			@include media_narrow {
				@include fz(18);
			}
		}
		.btn-01-circle__back {
			width: 54px;
			@include media_narrow {
				width: vw(26);
			}
		}
		.btn-01-circle__front {
			width: 54px;
			@include media_narrow {
				width: vw(26);
			}
		}
		.ico-angle-right {
			width: 28px;
			@include media_narrow {
				width: vw(13);
			}
		}
	}
}
</style>
