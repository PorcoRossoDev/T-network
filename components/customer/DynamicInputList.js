import { TextInput, TouchableOpacity, View } from 'react-native';
import * as HeroOutline from "react-native-heroicons/outline";

const DynamicInputList = ({ list, setList, placeholder, multiline = false }) => {
  const handleChange = (text, id) => {
    setList(prev => prev.map(p => p.id === id ? { ...p, value: text } : p));
  };

  const addItem = () => setList(prev => [...prev, { id: Date.now(), value: '' }]);
 const removeItem = (id) => {
    setList(prev => prev.length > 1 ? prev.filter(p => p.id !== id) : prev);
  };
  return (
    <View>
      {list.map((item, index) => {
        const isLast = index === list.length - 1;
        const isSingle = list.length === 1;
        return (
            <View key={item.id} className='flex-row gap-x-2 mb-4'>
                <TextInput
                    value={item.value}
                    multiline={multiline}
                    numberOfLines={multiline?4:0}
                    onChangeText={(text) => handleChange(text, item.id)}
                    className={`py-4 border border-[#ccc] px-3 rounded-lg flex-1 ${multiline?'min-h-20':''}`}
                    placeholder={placeholder}
                />
                <TouchableOpacity disabled={isSingle} onPress={() => removeItem(item.id)} className='bg-red-50 border border-red-200 rounded-full w-7 h-7 justify-center items-center'>
                    <HeroOutline.MinusIcon size={15} color='#ef4444' />
                </TouchableOpacity>
                {index === list.length - 1 && (
                    <TouchableOpacity onPress={addItem} className='bg-blue-50 border border-blue-200 rounded-full w-7 h-7 justify-center items-center'>
                      <HeroOutline.PlusIcon size={15} color='#3b82f6' />
                    </TouchableOpacity>
                )}
            </View>
        )
      }
      )}
    </View>
  )
}

export default DynamicInputList