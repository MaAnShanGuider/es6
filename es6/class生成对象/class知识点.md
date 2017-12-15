### es6的class知识点

1. **首先第一点：我们要明确一点，class只是语法糖，本质上还是构造函数。**

```
	class Boom {
		constructor(x,y){
			this.x = x;
			this.y = y;
		}
	}
	console.log(typeof Boom );
	//输出function
```
接下来，来看其他的地方。

2. **class简介**
es5里写生成实例对象的传统方法是通过构造函数。
```
	function Boom(a,b){
		this.a = a;
		this.b = b;
	}
	Boom.prototype={
		wocao(){
			console.log('a属性是:'+this.a);
			console.log('b属性是:'+this.b);
		}
	}
	var xixi = new Boom('张学友','刘德华');
	xixi.wocao();

        //  a属性是:张学友  
		//  b属性是:刘德华
```


而在es6的class里就是这样写了：
```
	class Boom {
		constructor(a,b){
			this.a = a;
			this.b = b;
		}

		wocao(){
			console.log('a属性是:'+this.a);
			console.log('b属性是:'+this.b);
		}
	}

	var xixi = new Boom('莱昂纳多','汤姆克鲁斯');
		xixi.wocao();
		// a属性是:莱昂纳多  
		// b属性是:汤姆克鲁斯
```

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

```
		xixi.hasOwnProperty('a');
		xixi.hasOwnProperty('b');
		xixi.hasOwnProperty('wocao');
		xixi.__proto__.hasOwnProperty('wocao');
```

```
	class Boom {
		constructor(a,b){
			this.a = a;
			this.b = b;
		}

		wocao(){
			console.log('a属性是:'+this.a);
			console.log('b属性是:'+this.b);
		}
	}

	var xixi = new Boom('莱昂纳多','汤姆克鲁斯');
		xixi.wocao();
		// a属性是:莱昂纳多  
		// b属性是:汤姆克鲁斯
		// 
	console.log(xixi.hasOwnProperty('a'));  				//true
	console.log(xixi.hasOwnProperty('b'));  				//true
	console.log(xixi.hasOwnProperty('wocao'));				//false
	console.log(xixi.__proto__.hasOwnProperty('wocao'));	//true
```

**重点一：constructor里写的相当于es5里直接写在构造函数里的内容。**

**重点二：在class内部除了construstor里的，其余写的都相当于写在class的prototype里。**

```
	class Boom {
		//-construstor是
		constructor(a,b){
			this.a = a;
			this.b = b;
		}
		
		//---下面的函数全都是相当于写在prototype里
		wocao(){
			console.log('a属性是:'+this.a);
			console.log('b属性是:'+this.b);
		}
	}
```

给class类添加方法一般用`Object.assign(Boom.prototype,{要添加的方法}`。这样可以一次性添加多个方法。

```
		Object.assign(Boom.prototype,{
				Fun1(){},
				Fun2(){},
				Fun3(){},
			})
```

3. 继承

Class之间可以通过extends关键字实现继承。

**super指的是父类本身**
**super()指的是父类的construstor方法**
**super。method指的是父类的prototype方法**

具体的语法是：
```
		class fatherClass{
				constructor(x,y){
					console.log(x+y);
				}
				fatherMethod(){
					console.log(this.x);
					console.log(this.y);
				}
		}
		class childClass extends fatherClass{
			constructor(a,b,c){
				super(a,b);
			}
			childMethod1(){
				super.fatherMethod();
				DoOtherThing;
			}
		}
```

```
			class Boom {
				constructor(a,b){
					this.a = a;
					this.b = b;
				}

				wocao(){
					console.log('a属性是:'+this.a);
					console.log('b属性是:'+this.b);
				}
			}

		class Doom extends Boom{
			constructor(x,y,z){
				//----调用父类的constructor方法
				super(x,y);
				this.c = z;
			}

			caonima(){
				//----调用父类的wocao方法
				super.wocao();
				console.log('c属性是:'+this.c);
			}
		}

		var xixi = new Doom('Alice','Bob','Cindy');
		xixi.caonima();
		//依次输出：
	    // 			a属性是:Alice 
		// 			b属性是:Bob  
		// 			c属性是:Cindy
```

