import React, { Component } from 'react';
import styles from './index.less';

export interface StarProps {
  starNum: number;
  endStar: (starNum: number) => void;
}

export interface StarState {
  starNum: number;
}

class Star extends Component<StarProps, StarState> {
  state = {
    starNum: this.props.starNum || 0,
  };

  toggleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.starRef && event) {
      const starX = this.starRef.getBoundingClientRect().x;
      const currentX = event.clientX;
      const num = (currentX - starX) / 32;
      if (
        !(
          Math.round(num) === Math.round(this.state.starNum) &&
          Math.ceil(num) === Math.ceil(this.state.starNum)
        )
      ) {
        this.setState({
          starNum: num,
        });
      }
    }
  };

  toggleHover = () => {
    this.props.endStar(this.state.starNum.toFixed(1));
  };

  render() {
    const { starNum } = this.state;
    const starDom = ['star', 'star', 'star', 'star', 'star'].map((item, index) => {
      if (starNum > index && starNum <= index + 0.5) {
        return <img src="/images/half_star.png" alt="" />;
      }
      if (starNum > index) {
        return <img src="/images/selected_star.png" alt="" />;
      }
      return <img src="/images/star.png" alt="" />;
    });
    return (
      <div
        className={styles.star}
        ref={tref => {
          this.starRef = tref;
        }}
        onMouseMove={this.toggleMove}
        onMouseLeave={this.toggleHover}
      >
        {starDom}
      </div>
    );
  }
}

export default Star;
