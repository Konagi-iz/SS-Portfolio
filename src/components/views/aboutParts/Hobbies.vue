<script setup>
import Button01 from '@/components/parts/Button01.vue';
import TextSplit from '@/components/parts/TextSplit.vue';
</script>

<template>
	<section class="lcl-hobbies">
		<h2 class="lcl-hobbies__ttl font-dp scr-anin">
			<TextSplit text="What I like"></TextSplit>
		</h2>
		<!-- .lcl-hobbies__ttl -->
		<ul class="lcl-hobbies-list">
			<li class="lcl-hobbies-list__item lcl-hobbies-list__item--gadget scr-anin fade-in-btm">
				<img
					class="lcl-hobbies-list__img"
					src="/assets/img/about/PC/img_gadget.jpg"
					alt="自室のPCデスクの写真"
					loading="lazy"
					width="1656"
					height="600"
				/>
				<p class="lcl-hobbies-list__ttl font-en">(01) Gadget</p>
			</li>
			<!-- .lcl-hobbies-list__item -->
			<li class="lcl-hobbies-list__item lcl-hobbies-list__item--photography scr-anin fade-in-btm">
				<img
					class="lcl-hobbies-list__img"
					src="/assets/img/about/PC/img_photography.jpg"
					alt="カメラを持っている写真"
					loading="lazy"
					width="1280"
					height="860"
				/>
				<p class="lcl-hobbies-list__ttl font-en">(02) Photography</p>
				<router-link :to="{ name: 'photo' }" class="lcl-hobbies-list__link">
					<button01
						v-bind="{
							isBig: true,
							color: 'orange',
							txt: 'VIEW PHOTOS',
						}"
					></button01>
				</router-link>
			</li>
			<!-- .lcl-hobbies-list__item -->
			<li class="lcl-hobbies-list__item lcl-hobbies-list__item--bike scr-anin fade-in-btm">
				<img
					class="lcl-hobbies-list__img"
					src="/assets/img/about/PC/img_bike.jpg"
					alt="愛車（自転車）の写真"
					loading="lazy"
					width="1300"
					height="730"
				/>
				<p class="lcl-hobbies-list__ttl font-en">(03) Bike</p>
			</li>
			<!-- .lcl-hobbies-list__item -->
		</ul>
		<!-- .lcl-hobbies-list -->
	</section>
</template>

<style scoped lang="scss">
.lcl-hobbies {
	margin-top: 200px;
	margin-inline: auto;
	padding-inline: 60px;
	width: min(1900px, 100%);
	@include media_narrow {
		margin-top: vw(160);
		padding-inline: vw(15);
	}

	/* ttl ------------ */
	.lcl-hobbies__ttl {
		overflow: hidden;
		color: $c-orange;
		@include fz(48);
		line-height: 1.5;
		@include media_wide {
			margin-left: 90px;
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(11);
		}
	}

	/* list ------------ */
	.lcl-hobbies-list {
		margin-top: 50px;
		@include media_narrow {
			display: flex;
			flex-direction: column;
			gap: vw(24);
			margin-top: vw(40);
		}
	}
	.lcl-hobbies-list__item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 24px;
		@include media_narrow {
			gap: vw(8);
		}
	}
	.lcl-hobbies-list__item--gadget {
		@include media_wide {
			align-items: flex-start;
			margin-left: 90px;
			width: calc(100% - 262px);
			.lcl-hobbies-list__img {
				width: 100%;
				height: 300px;
			}
		}
	}
	.lcl-hobbies-list__item--photography {
		@include media_wide {
			align-items: center;
			margin-inline: auto 0;
			margin-top: -95px;
			width: calc(100% - 540px);
			&:has(.lcl-hobbies-list__link:hover) .lcl-hobbies-list__img {
				transform: translateX(20px);
			}
			.lcl-hobbies-list__img {
				width: 100%;
				height: 420px;
				transition: transform 1s $e-out-expo;
			}
		}
	}
	.lcl-hobbies-list__item--bike {
		@include media_wide {
			align-items: flex-end;
			margin-top: -103px;
			width: calc(100% - 530px);
			.lcl-hobbies-list__img {
				width: 100%;
				height: 365px;
			}
		}
	}
	.lcl-hobbies-list__img {
		border-radius: 8px;
		object-fit: cover;
		@include media_narrow {
			border-radius: vw(8);
			height: vw(180);
		}
	}
	.lcl-hobbies-list__ttl {
		@include fz(16);
		font-weight: 400;
		line-height: 1.5;
	}
	.lcl-hobbies-list__link {
		position: absolute;
		right: 0;
		bottom: 24px;
		@include media_narrow {
			bottom: vw(20);
		}
	}
}
</style>
