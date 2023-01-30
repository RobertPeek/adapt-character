import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class CharacterView extends ComponentView {

  preRender() {
    this.listenTo(Adapt, {
      'device:resize': this.resizeControl
    });
  }

  postRender() {
    this.resizeControl();

    this.$('.character__widget').imageready(() => {
      this.setReadyStatus();
      this.setupInviewCompletion('.character__widget');
    });
  }

  resizeControl() {
    this.resetStyles();

    if (Adapt.device.screenSize == 'small') {
      this.setupSmallSize();
    } else if (Adapt.device.screenSize == 'medium') {
      this.setupMediumSize();
    } else {
      this.setupLargeSize();
    }

    this.resizeImage(Adapt.device.screenSize);
  }

  setupLargeSize() {
    // Text
    this.$('.character__text').addClass('overlay');
    this.$('.character__text').css('width', this.model.get('_text')._width + '%');
    this.$('.character__text').css('top', this.model.get('_text')._top);
    this.$('.character__text').css('left', this.model.get('_text')._left + '%');
    this.$('.bubble').addClass('bubble-' + (this.model.get('_text')._location));

    // Graphic
    if (this.model.has('_graphic')) {
      if (this.model.get('_graphic')._location == "left") {
        this.$('.character__graphic').addClass('left');
      }

      if (this.model.get('_graphic')._location == "right") {
        this.$('.character__graphic').addClass('right');
      }

      if (this.model.get('_graphic')._location == "center") {
        this.$('.character__graphic').addClass('center');
      }
    }
  }

  setupMediumSize() {
    this.$('.character__graphic').addClass('center');
    this.$('.bubble').addClass('bubble-bottom');
  }

  setupSmallSize() {
    this.$('.character__graphic').addClass('center');
    this.$('.bubble').addClass('bubble-bottom');
  }

  resetStyles() {
    // Text
    this.$('.character__text').removeClass('overlay');
    this.$('.character__text').css('width', 'auto');
    this.$('.character__text').css('top', 0);
    this.$('.character__text').css('left', 0);
    this.$('.bubble').removeClass('bubble-top');
    this.$('.bubble').removeClass('bubble-bottom');
    this.$('.bubble').removeClass('bubble-left');
    this.$('.bubble').removeClass('bubble-right');
    // Arrow
    this.$('.arrow').attr('style', '');
    this.$('.arrow-border').attr('style', '');
    // Graphic
    this.$('.character__graphic').removeClass('left');
    this.$('.character__graphic').removeClass('right');
    this.$('.character__graphic').removeClass('center');
  }

  resizeImage(width) {
    // Arrow
    if (this.model.get('_text')._background) {
      this.$('.bubble-top').find('.arrow').css('border-top-color', this.model.get('_text')._background);
      this.$('.bubble-right').find('.arrow').css('border-right-color', this.model.get('_text')._background);
      this.$('.bubble-bottom').find('.arrow').css('border-bottom-color', this.model.get('_text')._background);
      this.$('.bubble-left').find('.arrow').css('border-left-color', this.model.get('_text')._background);
    }

    // Border
    if (this.model.get('_text')._borderWidth > 0) {
      this.$('.bubble-top').find('.arrow-border').css('border-top-color', this.model.get('_text')._color);
      this.$('.bubble-right').find('.arrow-border').css('border-right-color', this.model.get('_text')._color);
      this.$('.bubble-bottom').find('.arrow-border').css('border-bottom-color', this.model.get('_text')._color);
      this.$('.bubble-left').find('.arrow-border').css('border-left-color', this.model.get('_text')._color);

      // Position
      this.$('.bubble-top').find('.arrow-border').css({
        'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
        'bottom': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
        'margin-right': -(16 + this.model.get('_text')._borderWidth) + 'px'
      });

      this.$('.bubble-right').find('.arrow-border').css({
        'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
        'left': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
        'margin-top': -(16 + this.model.get('_text')._borderWidth) + 'px'
      });

      this.$('.bubble-bottom').find('.arrow-border').css({
        'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
        'top': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
        'margin-right': -(16 + this.model.get('_text')._borderWidth) + 'px'
      });

      this.$('.bubble-left').find('.arrow-border').css({
        'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
        'right': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
        'margin-top': -(16 + this.model.get('_text')._borderWidth) + 'px'
      });

    } else {
      this.$('.bubble-top').find('.arrow-border').css('display', 'none');
    }
  }

}

CharacterView.template = 'character.jsx';

export default CharacterView;
