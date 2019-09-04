import React, {
	Component,
} from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;

type Props = {};
export default class CommonTable extends Component < Props > {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		if (__DEV__)
			console.log('++++++++++', 'CommonTable');

		// 计算每列宽度
		let columnsWidth = [];
		if (this.props.columnsWidth)
			columnsWidth = this.props.columnsWidth;
		else
			columnsWidth = Array(this.props.tableHeader.length).fill(this.props.tableWidth ? this.props.tableWidth / this.props.tableHeader.length : screenWidth / this.props.tableHeader.length);

		let TableHeaderComp;
		if (this.props.tableHeader) {
			let TableHeaderCont = [];
			this.props.tableHeader.map((val, ind) => {
				TableHeaderCont[ind] =
					<View key={ind} style={{
							width:columnsWidth[ind],
							paddingHorizontal:2,
							borderColor:this.props.borderColor,
							borderTopWidth:this.props.borderWidth,
							borderRightWidth:this.props.borderWidth,
							borderLeftWidth:ind===0?this.props.borderWidth:0}}
					>
						<Text style={this.props.textHeaderStyle}>
							{val}
						</Text>
					</View>
			});
			TableHeaderComp =
				<View style={[{flexDirection: 'row'},this.props.tableHeaderStyle]}>
					{TableHeaderCont}
				</View>;
		}

		let TableDataComp = [];
		for (let i = 0; i < this.props.tableData.length; i++) {
			let TableDataCont = [];
			for (let j = 0; j < this.props.tableData[i].length; j++) {
				TableDataCont[j] =
					<View key={j} style={{
							width:columnsWidth[j],
							paddingHorizontal:2,
							borderColor:this.props.borderColor,
							borderBottomWidth:this.props.borderWidth,
							borderRightWidth:this.props.borderWidth,
							borderTopWidth:i===0?this.props.borderWidth:0,
							borderLeftWidth:j===0?this.props.borderWidth:0}}
					>
						<Text style={this.props.textDataStyle}>
							{this.props.tableData[i][j]}
						</Text>
					</View>
			}

			TableDataComp[i] =
				<View key={i} style={[{flexDirection: 'row'},this.props.tableDataStyle]}>
					{TableDataCont}
				</View>;
		}

		return (
			<View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
				{TableHeaderComp}
				{TableDataComp}
      </View>
		);
	}
}

CommonTable.propTypes = {
	tableHeader: PropTypes.array.isRequired,
	tableData: PropTypes.array.isRequired,
	columnsWidth: PropTypes.array,
	tableWidth: PropTypes.number, //如果不设置columnsWidth，则设置此值可以指定表格整体宽度，如果columnsWidth与tableWidth都不设置，这表格宽度为screenWidth
	tableHeaderStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	textHeaderStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	tableDataStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	textDataStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	borderWidth: PropTypes.number,
	borderColor: PropTypes.string,
}
CommonTable.defaultProps = {
	borderWidth: 1,
	borderColor: '#121917',
};