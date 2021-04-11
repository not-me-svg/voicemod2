import { shallowMount } from '@vue/test-utils';
import Search from '@/components/search';

describe('search.vue', () => {
  it('if delete input button is clicked, it should execute empty fn', () => {
    const search = shallowMount(Search);
    search.vm.resetInput = jest.fn();
    
    search.find('.vm-search-close').trigger('click');
    expect(search.vm.resetInput).toBeCalled();
  });
});
