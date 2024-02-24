<script setup>
import TextSplit from '@/components/parts/TextSplit.vue';
import IconStar from '~icons/svg/ico-star';
</script>

<template>
	<section class="lcl-profile">
		<div class="lcl-profile__head">
			<h2 class="lcl-profile__ttl font-dp scr-anin">
				<TextSplit text="Profile"></TextSplit>
			</h2>
			<!-- prettier-ignore -->
			<p class="lcl-profile__txt scr-anin fade-in-btm">
        デザインだけできるじゃない。<br>
        コーディングだけできるじゃない。<br>
        デザインとコーディングの両方が<br>
        できるからこそ作れる物を作りたい。
      </p>
			<!-- .lcl-profile__txt -->
		</div>
		<!-- .lcl-profile__head -->
		<div class="lcl-profile__main">
			<ul class="lcl-profile-list scr-anin">
				<li
					v-for="(item, index) in [
						{
							ttl: 'NAME',
							txt: 'Shimakawa Shodai / 島川 昌大',
						},
						{
							ttl: 'AGE',
							txt: '20',
						},
						{
							ttl: 'WHERE',
							txt: 'Toyota Aichi',
						},
					]"
					:key="index"
					class="lcl-profile-list__item fade-in-btm"
				>
					<p class="lcl-profile-list__ttl font-en">{{ item.ttl }}</p>
					<p class="lcl-profile-list__txt font-en">{{ item.txt }}</p>
				</li>
				<!-- .lcl-profile-list__item -->
				<li class="lcl-profile-list__item fade-in-btm">
					<p class="lcl-profile-list__ttl font-en">SKILLS</p>
					<ul class="lcl-profile-skills">
						<li
							v-for="(skill, index) in [
								'Photoshop',
								'Illustrator',
								'Lightroom',
								'Photography',
								'Figma',
								'HTML & CSS',
								'SASS',
								'JavaScript',
								'PHP',
							]"
							:key="index"
							class="lcl-profile-skills__item"
						>
							<IconStar></IconStar>
							<p class="lcl-profile-skills__txt font-en">{{ skill }}</p>
						</li>
						<!-- .lcl-profile-skills__item -->
					</ul>
					<!-- .lcl-profile-skills -->
				</li>
				<!-- ..lcl-profile-list__item -->
			</ul>
			<!-- .lcl-profile-list -->
			<img
				class="lcl-profile__img scr-anin fade-in-btm"
				src="/assets/img/about/PC/img_prof.jpg"
				alt="私のプロフィール写真"
				width="1000"
				height="1308"
				loading="lazy"
			/>
			<!-- .lcl-profile__img -->
		</div>
		<!-- .lcl-profile__main -->
	</section>
</template>

<style scoped lang="scss">
.lcl-profile {
	display: flex;
	flex-direction: column;
	gap: 120px;
	margin-top: 250px;
	margin-inline: auto;
	padding-inline: 60px;
	width: min(1900px, 100%);
	@include media_narrow {
		gap: vw(80);
		margin-top: vw(160);
		padding-inline: vw(15);
	}

	/* head ------------ */
	.lcl-profile__head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.lcl-profile__ttl {
		overflow: hidden;
		@include fz(48);
		line-height: 1.5;
		letter-spacing: 0.07em;
		@include media_narrow {
			@include fz(24);
		}
		&.scr-anin--on :deep(.split-span) {
			transform: translateY(0);
		}
		:deep(.split-span) {
			@include delay(7);
		}
	}
	.lcl-profile__txt {
		@include txt-basic;
		@include media_wide {
			width: 500px;
		}
	}

	/* main ------------ */
	.lcl-profile__main {
		display: flex;
		justify-content: space-between;
		gap: 90px;
		@include media_narrow {
			flex-direction: column-reverse;
			gap: vw(40);
		}
	}

	/* list ------------ */
	.lcl-profile-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		& > * + * {
			border-top: 1px solid $c-gray;
			padding-top: 32px;
			@include media_narrow {
				padding-top: vw(32);
			}
		}
		&.scr-anin--on .lcl-profile-list__item {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
	}
	.lcl-profile-list__item {
		@include delay(4, 0.1);
		&:not(&:last-of-type) {
			padding-bottom: 32px;
			@include media_narrow {
				padding-bottom: vw(32);
			}
		}
	}
	.lcl-profile-list__ttl {
		color: $c-gray;
		@include fz(12);
		font-weight: 400;
		line-height: 1.2;
	}
	.lcl-profile-list__txt {
		@include fz(16);
		line-height: 1.5;
	}

	/* skills ------------ */
	.lcl-profile-skills {
		display: flex;
		flex-direction: column;
		gap: 8px;
		@include media_narrow {
      align-items: flex-start;
			flex-wrap: wrap;
			gap: vw(8) vw(10);
			height: vw(152);
		}
	}
	.lcl-profile-skills__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-left: 10px;
		@include media_narrow {
			gap: vw(10);
			padding-left: vw(10);
		}
	}
	.ico-star {
		width: 12px;
		height: auto;
	}
	:deep(.ico-star__path) {
		fill: $c-white;
	}
	.lcl-profile-skills__txt {
		@include fz(16);
		line-height: 1.5;
	}

	/* img ------------ */
	.lcl-profile__img {
		border-radius: 12px;
		width: 500px;
		@include media_narrow {
			border-radius: vw(12);
			width: 100%;
			height: vw(450);
			object-fit: cover;
		}
	}
}
</style>
