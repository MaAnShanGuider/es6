### Promise.resolve()的用法
Promise.resolve()的作用是将不是promise对象的对象转为promise对象。

`Promise.resolve('foo')`等价于下面那段

```
	new Promise((resolve)=>{
			resolve('foo');  //----a段代码
		})
```

也就是说，a段代码里的`resolve('foo')`里的foo是作为参数，将要传到接下来的then方法上的。

`Promise.resolve`方法的参数分成四种情况：
1. 参数是一个`Promise`实例

  如果参数是一个实例，那么将会原封不动的，返回这个实例。

2. 参数是一个`thenable`对象

`thenable`对象是指带有then方法的对象.

`Promise.resolve`方法会将这个对象转为 `Promise `对象，然后就立即执行`thenable`对象的`then`方法。

```
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		
	</body>
	<script>

		const obj = {
			name:'wocao',
			then(){
				console.log('我是带有thenable方法的对象');
			}
		}
		Promise.resolve(obj).then(()=>{  //----b段代码
			console.log('wocoanima');
		})
	</script>
	</html>
```

控制台会输出:我是带有thenable方法的对象

不会输出wocaonima。也就是说不会执行b段代码里的then方法，原因是被转化为promise实例的对象并没有调用resolve方法。下面就是可以都输出。

```
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		
	</body>
	<script>

		const obj = {
			name:'wocao',
			then(resolve,reject){
				console.log('我是带有thenable方法的对象');
				// resolve();
				   reject();//----c段代码
			}
		}
		Promise.resolve(obj).then(()=>{
			console.log('我是resolve');
		}).catch(()=>{console.log('我是catch')});
	</script>
	</html>
```

改变c段代码的，可以执行then或者catch里的回调。

3. 参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则`Promise.resolve`方法返回一个新的 `Promise` 对象，状态为`resolved`。

```
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		
	</body>
	<script>
		/*
			当Promise.resolve(参数)为固定值时，会作为then内的参数.
		 */
		var a = 'wocaonima';
		var b = true;
		var c = 999;
		Promise.resolve(a).then(res=>console.log(res));
		Promise.resolve(b).then(res=>console.log(res));
		Promise.resolve(c).then(res=>console.log(res));
		/*
			依次输出：
						wocaonima  
						true  
						999
		 */
	</script>
	</html>
```

再看看阮一峰大神的教程写的。

```
	const p = Promise.resolve('Hello');

	p.then(function (s){
	  console.log(s)
	});
	// Hello
```

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

**而且要注意的是，如果你给那些原始类型的值添加then方法是不行的。**
```
	var str = '张学友';
	str.then=function(){
		console.log('我是对象本身的方法');
	}
	str.then();
```
会报错。

4. 不带有任何参数

`Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 `Promise` 对象。
所以，如果希望得到一个 `Promise` 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

```
	const p = Promise.resolve();

	p.then(function () {
	  // ...
	});
```
