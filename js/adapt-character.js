import Adapt from 'core/js/adapt';
import CharacterModel from './CharacterModel';
import CharacterView from './CharacterView';

export default Adapt.register('character', {
  model: CharacterModel,
  view: CharacterView
});
