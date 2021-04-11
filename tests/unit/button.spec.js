import { shallowMount } from '@vue/test-utils';
import Button from '@/components/button';

describe('button.vue', () => {
  test('if button is clicked, it should $emit onCLick', () => {
    const button = shallowMount(Button);
    button.vm.emitOnClick = jest.fn();
    
    button.find('button').trigger('click');
    expect(button.vm.emitOnClick).toBeCalled();
  });
});
