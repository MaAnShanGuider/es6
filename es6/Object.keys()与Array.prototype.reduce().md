
Object.keys(obj):
  > 参数:可以是对象，数组，类数组。
  > 返回值:参数为对象，返回属性名;参数为数组，类数组，返回索引值。
 ```
		let xixi = {wo:'aaa',cao:'bbb'};
		let haha = ['aa','bb','cc'];

		console.log(Object.keys(xixi));
		//---['wo','cao'];
		
		console.log(Object.keys(haha));
		//---['0','1','2'];
 ```

Array.prototype.reduce():
 > 参数：
 		两个参数，第一个参数为回调函数callback(sum,ele)，回调函数也有两个参数，第一个值为上一个的返回值，ele为当前遍历到的成员。第二个参数为自己定义的初始sum，可选。
 		第二个参数不写，reduce会执行length-1次，callback的sum的初始值就是第一个ele，而reduce会从第二个ele开始执行。
 		第二个参数写，reduce就会执行length次，reduce从第一个ele开始执行。
 > 返回值:最终的sum

```
	let arr = [1,2,3];
	let arr2 = arr.reduce((sum,ele)=>{
		//--执行两次
		console.log('sum:'+sum,'ele:'+ele);
		//---下面的返回值作为下一次的运行的sum
		return sum+ele;
	})
	let arr3 = arr.reduce((sum,ele)=>{
		//--执行三次
		console.log('sum:'+sum,'ele:'+ele);
		//---下面的返回值作为下一次的运行的sum
		return sum+ele;
	},0)
	console.log(arr2);
	console.log(arr3);
```

