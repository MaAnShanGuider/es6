define(['jquery'],function(){
	return{
		//-----------下面写主程序
		change:(function(){
			var num = 1;

			function autoAnimation(){
				timer = setInterval(function(){					
					$('.banner_main_pic ol li').
					eq(num).
					css({background:'white'}).
					siblings().
					css({background:'black'});
					$('.banner_main_pic ul li').
					eq(num).
					animate({opacity:1},400).
					siblings().
					animate({opacity : 0},400);

				console.log(num);
					num++;
					if(num==6){
						num = 0;
					}
				},2000)
				
			
			}
			autoAnimation();

			//------jq的hover模仿的是onmouseenter,onmouseleave
			//		而不是onmouseover,onmouseout.
			//		下面的hover，当鼠标进入ol的时候，也会触发hover离开事件。
			//					当鼠标从ol进入ul的时候，也会触发hover进入事件。
			$('.banner_main_pic ul').hover(
				function(){
					clearInterval(window.timer)//--一号清除:当鼠标进入ul的时候，清除
				},
				function(){
					clearInterval(window.timer);//--二号清除:当鼠标离开ul的时候，清除
					autoAnimation();			//--并且清楚后，又执行一次autoAnimation().
					//而且，当鼠标点击ol的li时候，也会触发这个函数。也就是说，点击的时候
					//定时器也在运行。
					//而且比点击事件，先触发。
				})
			$('.banner_main_pic ol').on('click','li',function(event) {
				clearInterval(window.timer);//---三号清除，没什么卵用
				num = $(this).index();
				$('.banner_main_pic ol li').eq(num).css({background:'white'}).
					siblings().
					css({background:'black'});
					$('.banner_main_pic ul li').eq(num).animate({opacity:1},400,function(){console.log('点击成功')}).
					siblings().  //这里是问题的根本所在，如果四号清除不写，只写个三号清除，那么每一个这个jq对象
									//的同辈元素都会触发一次下面这个animate的回调函数，也就是里面的autoAnimation()
									//会触发很多次，而里面的定时器timer并不会被覆盖，而是每个定时器都走自己的。
									//那么四号清除不写，就会造成，推按一闪一闪。
					animate({opacity : 0},400,function(){
						clearInterval(window.timer);//----最重要的四号清除:清除上一个timer
						autoAnimation();			
					});
					num++;
					if(num==6){
						num = 0;
					}
				


			});
		})(),
	}
})