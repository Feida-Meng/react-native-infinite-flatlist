import React, {
	PureComponent
} from 'react';

import {
	View,
	FlatList,
} from 'react-native';

export default class InfiniteFlatList extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { itemSize: 0 };
	}

	onScroll = e => {

		this.props.onScroll && typeof this.props.onScroll === "function" && this.props.onScroll(e)

		const offset = this.props.horizontal ? e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y;
		const currentIndex = offset / this.state.itemSize;

		this.resetIndex(offset, currentIndex);

		this.props.getCurrentIndex(this.getRelativeIndex(currentIndex));

	};

	getRelativeIndex = index => {

		if(index > this.props.data.length - 1) {
			index -= (Math.floor(index/this.props.data.length) * this.props.data.length);
		}

		return index;
	};

	onMomentumScrollEnd = e => {

		this.props.onMomentumScrollEnd && typeof this.props.onMomentumScrollEnd === "function" && this.props.onMomentumScrollEnd(e)
		this.onScroll(e);


	};

	resetIndex = (offset, decimalCurrentIndex) => {

		if (offset <= this.state.itemSize) {

			const index = this.props.data.length + decimalCurrentIndex;

			this.list && this.list.scrollToOffset({ offset: index * this.state.itemSize, animated: false });

		}


		if (this.list && (this.props.data.length * 3 * this.state.itemSize - offset) <= (this.props.numberOfItemPerScreen * this.state.itemSize) ) {

			const index = decimalCurrentIndex - this.props.data.length;

			this.list && this.list.scrollToOffset({ offset: index * this.state.itemSize, animated: false });
		}
	};

	getFlatListProps = () => {

		const temp = { ...this.props };
		delete temp.data;
		delete temp.infiniteFlatListContainerStyle;
		delete temp.renderItem;
		delete temp.getCurrentIndex;
		delete temp.initialScrollIndex;
		delete temp.onMomentumScrollEnd;
		delete temp.onScroll;
		return temp;

	};

	onLayout = e => {

		let { width, height } = e.nativeEvent.layout;
		const containerSize = this.props.horizontal ? width : height;
		const itemSize = containerSize / this.props.numberOfItemPerScreen;

		this.setState({ itemSize });

		setTimeout(() => this.list && this.list.scrollToOffset({ offset: this.initialScrollIndex() * itemSize, animated: false }), 1);

	};

	renderItem = ({ item, index }) => {

		const relativeIndex = this.getRelativeIndex(index);

		const style = this.props.setItemContainerStyle ? { ...styles.itemStyle, ...this.props.setItemContainerStyle({ item, index: relativeIndex }) } : { ...styles.itemStyle };

		style[this.props.horizontal ? 'width' : 'height' ] = this.state.itemSize;


		return (
			<View
				style={style}
			>
				{this.props.renderItem({ item, index: relativeIndex })}
			</View>
		);
	};

	initialScrollIndex = () => {

		if (this.props.data) {

			let initialScrollIndex;

			if (this.props.initialScrollIndex) {


				initialScrollIndex = this.props.initialScrollIndex + this.props.data.length


			} else {

				initialScrollIndex = this.props.data.length;
			}

			this.props.getCurrentIndex(this.getRelativeIndex(initialScrollIndex));


			return initialScrollIndex;
		}
	};

	render() {

		return (

			<View
				style={this.props.infiniteFlatListContainerStyle || style.defaultContainerStyle}
				onLayout={this.onLayout}
			>

				<FlatList
					data={this.props.data ? [ ...this.props.data, ...this.props.data, ...this.props.data ] : []}
					ref={ref => this.list = ref}
					renderItem={this.renderItem}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					disableIntervalMomentum={true}
					decelerationRate={0.4}
					onScroll={this.props.useOnScroll ? this.onScroll : null}
					snapToInterval={this.state.itemSize}
					snapToAlignment={'center'}
					onMomentumScrollEnd={this.props.useOnScroll ? null : this.onMomentumScrollEnd}
					{...this.getFlatListProps()}
				/>

			</View>

		);
	}
}


const styles = {
	itemStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	defaultContainerStyle: {
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center'
	}

};

