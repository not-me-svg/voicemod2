import {shallowMount} from "@vue/test-utils";
import Voice from '@/components/voice';

describe('voice.vue', async () => {
  const voice = shallowMount(Voice, {
    propsData: {
      isSelected: false,
      isFav: false,
    }
  });

  voice.vm.favVoice = jest.fn();
  voice.vm.selectVoice = jest.fn();

  it('voice must be unselected and unfaved xD', () => {
    expect(voice.props().isSelected).toBe(false);
    expect(voice.props().isFav).toBe(false);
  });

  const favIcon = voice.find('#voice-fav-icon');
  await favIcon.trigger('click');
  expect(voice.vm.favVoice).toBeCalled();

  const voiceImage = voice.find('#voice-image' );
  await voiceImage.trigger('click');
  expect(voice.vm.selectVoice).toBeCalled();
});
