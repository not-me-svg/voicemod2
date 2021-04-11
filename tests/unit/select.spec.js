import { mount } from '@vue/test-utils';
import Select from '@/components/select';

describe('select.vue', () => {
  test('select must be closed', () => {
    const wrapper = mount(Select);
    expect(wrapper.vm.open).toBe(false);
  });

  test('on click select must be opened', () => {
    const wrapper = mount(Select);
    wrapper.find('.select-container_selected').trigger('click');
    expect(wrapper.vm.open).toBe(true);
  });

  test('on click select option select must be closed', () => {
    const wrapper = mount(Select);
    wrapper.vm.selectOption = jest.fn();
    if (wrapper.vm.open) {
      wrapper.find('.select-container_items_option').trigger('click');
      expect(wrapper.vm.selectOption).toBeCalled();
      expect(wrapper.vm.open).toBe(false);
    }
  });
});
