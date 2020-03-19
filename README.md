
![example image1](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/dogs.gif)
![example image2](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/timer.gif)
![example image2](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/sun.gif)
![example image2](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/timer.gif)

# Installation
`npm i @feida_meng/react-native-infinite-flatlist`

# How to use

## Example 1

![example image2](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/example1.gif)

```javascript
import {
	View,
	Text,
} from "react-native";

import React, { Component } from 'react';

import InfiniteFlatList from '@feida_meng/react-native-infinite-flatlist';

const data = [
	{ value: 0},
	{ value: 1},
	{ value: 2},
	{ value: 3},
	{ value: 4},
	{ value: 5},
	{ value: 6},
	{ value: 7},
	{ value: 8},
	{ value: 9},
	{ value: 10},
	{ value: 11},
];

export default class InfiniteFlatListEg1 extends Component {


	constructor() {
		super();
		this.state = { currentIndex: 2 };
	}

	renderItem = ({ item, index }) => {

		return (

			<View
				style={{
					width: 200,
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'transparent',
					borderWidth: 1,
				}}
			>
				<Text
					style={{
						color: 'red',
						fontSize: 16,
						textAlign: 'center',
						fontWeight: index === this.state.currentIndex ? 'bold' : 'normal'
					}}
				>{item.value}</Text>
			</View>

		);
	};

	getCurrentIndex = currentIndex => this.setState({ currentIndex });

	render() {
		return (
			<InfiniteFlatList
				infiniteFlatListContainerStyle={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}
				numberOfItemPerScreen={6} //number of item per screen 
				data={data}
				renderItem={this.renderItem}
				keyExtractor={(item,index) => item + index}
				getCurrentIndex={this.getCurrentIndex}
				initialScrollIndex={this.state.currentIndex}
				decelerationRate={0.3}
			/>
		);
	}
}

```

## Example 2

![example image1](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/dogs.gif)

```javascript

import {
	View,
	Image,
	Dimensions,
} from "react-native";

import React, { Component } from 'react';

import InfiniteFlatList from '@feida_meng/react-native-infinite-flatlist';

const { width } = Dimensions.get('window');

const data = [
	{
		url: 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_1280.jpg'
	},
	{
		url: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/04/12185602/Lagotto-Romangolo-Tongue-Out.jpg'
	},
	{
		url: 'https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all'
	},
	{
		url: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1689,w_3000,x_0,y_404/f_auto,q_auto,w_1100/v1563809078/shape/mentalfloss/28865-gettyimages-500694766.jpg'
	},
	{
		url: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/basset-hound-detail.jpg?bust=1535565151&width=355'
	}
];

export default class InfiniteFlatListEg2 extends Component {

	constructor(props) {
		super(props);
		this.state = { currentIndex: 0 };
	}

	renderItem = ({ item, index }) => {

		const isHeightLighten = ( index === this.state.currentIndex + 1 ) || ( index === 0 && this.state.currentIndex === 4 );

		return (

			<View
				style={{
					width: isHeightLighten ? 210 : 200, height: isHeightLighten ? 190 : 170, borderRadius: 10, elevation: isHeightLighten ? 10 : 5
				}}
			>
				<Image
					style={{ width: '100%', height: '100%', borderRadius: 10 }}
					source={{ uri: item.url }}
				/>
			</View>

		);
	};

	getCurrentIndex = currentIndex => this.setState({ currentIndex });

	render() {

		return (
			<View
				style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
			>
				<InfiniteFlatList
					infiniteFlatListContainerStyle={{ width: width * 2, height: 300, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
					numberOfItemPerScreen={3}
					data={data}
					horizontal
					renderItem={this.renderItem}
					keyExtractor={(item,index) => item + index}
					getCurrentIndex={this.getCurrentIndex}
					initialScrollIndex={this.state.currentIndex}
				/>
			</View>
		);
	}
}

```

## example 3

![example image2](https://github.com/Feida-Meng/react-native-infinite-flatlist/tree/master/assets/images/sun.gif)


```javascript


import {
	View,
	Image,
	Dimensions,
	Text,
} from "react-native";

import React, { Component } from 'react';

import InfiniteFlatList from '@feida_meng/react-native-infinite-flatlist';
const { width, height } = Dimensions.get('window');

const earthSize = 40;

const data = [
	{ month: 'Jul'},
	{ month: 'Aug'},
	{ month: 'Sep'},
	{ month: 'Oct'},
	{ month: 'Nov'},
	{ month: 'Dec'},

	{ month: 'Jan'},
	{ month: 'Feb'},
	{ month: 'Mar'},
	{ month: 'Apr'},
	{ month: 'May'},
	{ month: 'Jun'},
];

export default class InfiniteFlatListEg3 extends Component {


	constructor(props) {
		super(props);
		this.state = { currentIndex: 0, left: 10, top: height/2 - earthSize/2 };
	}


	renderItem = ({ item, index }) => {

		return (

			<View
				style={{
					width: '100%',
					height: '100%',
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'transparent',

				}}
			>
				<Text style={{ color: 'yellow', fontSize: 16, textAlign: 'center' }}>{item.month}</Text>
			</View>

		);
	};

	getCurrentIndex = currentIndex => {

		/**
		 *note currentIndex is not necessary an integer, it can be for eg. 1.5
		 *otherwise the earth would not be able travel smoothly
		 */

		const left = this.getLeft(currentIndex);
		this.setState({ currentIndex, left, top: this.getTop(currentIndex, left) });
	};


	getTop = (currentIndex, left) => {

		/**
		 * although the shape of the Earth orbit is an ellipse
		 * for simplicity, top is calculated using
		 * Standard Form for the equation of a circle,
		 * (x−a)2 + (y−b)2 = r2.
		 */

		const top = Math.pow( Math.pow( ( width - ( earthSize + 20 ) ) / 2 ,2) - Math.pow( ( left + earthSize / 2 - width / 2 ),2) , 1/2) + height / 2 - earthSize / 2;

		if (currentIndex <= 6) {
			console.log((top - height/2));

			return height/2 - (top - height/2) - earthSize;
		} else {
			console.log((top - height/2));
			return top;
		}
	};


	getLeft = currentIndex => {

		/**
		  width - (earthSize + 20) is max distance the earth travels horizontally on the screen, x
		  (width - (earthSize + 20))/6, the distance the earth travels per scrolling over one index
		  the + 10 is the offset in x, the value of left when index is 0
 		*/

		if (currentIndex <= 6) {

			return currentIndex * (width - (earthSize + 20))/6 + 10;

		} else {

			return (12 - currentIndex) * (width - (earthSize + 20))/6 + 10;
		}
	};


	render() {

		return (
			<View
				style={{
					alignItems: 'center',
					flex: 1,
					backgroundColor: 'black'
				}}
			>

				<InfiniteFlatList
					infiniteFlatListContainerStyle={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}
					numberOfItemPerScreen={3}
					data={data}
					horizontal
					renderItem={this.renderItem}
					keyExtractor={(item,index) => item + index}
					getCurrentIndex={this.getCurrentIndex}
					useOnScroll
					snapToInterval={null}
					decelerationRate={0.9}
				/>

				<Image
					style={{
						width: earthSize,
						height: earthSize,
						position: 'absolute',
						left: this.state.left,
						top: this.state.top
					}}
					source={require('./assets/earth.png')}

				/>

				<Image
					style={{ width: 70, height: 70, position: 'absolute', top: height/2 - 100/2, left: 80 }}
					source={require('./assets/sun.png')}
				/>

			</View>
		);

	}
}


```

# Props

Inherits ScrollView Props

| Name                           | Type          | Default/Required | Description                          |  
| ------------------------------ |---------------| ---------------- | ------------------------             |
| infiniteFlatListContainerStyle | object        | required         |                                      |
| data                           | array         | required         |                                      |
| numberOfItemPerScreen          | number        | 3                | number of item to show               |
| getCurrentIndex                | function      |                  | return the current index of flatlist |
| setItemContainerStyle          | function      |                  | `(item: obj, index: number) => obj`, used to set the style for item container |
| useOnScroll                    | boolean       | false            | use onScroll function to trigger getCurrentIndex() |
| snapToInterval                 | number        | item size        | item size is automatically calculated, set to null for no snapping |                                    |

## note


**getCurrentIndex**:
getCurrentIndex does not necessarily return an integer, it can be for eg. 1.5, which means the flatlist is scrolling at half way between index 1 and 2

By default, when onMomentumScrollEnd of the flatlist is called, this function is called to return the current index;
However, if you need to trigger it while flatlist scrolling, set the prop, useOnScroll, to true, see example 3

**setItemContainerStyle**, example of this function:
 ```
setItemContainerStyle = ({ item, index }) => {
   
    //this function has access to item and index in case you need to munipulate the style based on those values
    return ({
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'red'
    });
};

 ``` 




