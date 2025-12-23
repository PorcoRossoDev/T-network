import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as HeroSolid from "react-native-heroicons/solid";
import * as HeroOutline from "react-native-heroicons/outline";

const OrderItem = ({icon, variant = 'solid'}) => {
    const sets = { solid: HeroSolid, outline: HeroOutline };
    const IconComponent = sets[variant]?.[icon];
    return (
        <IconComponent size={20} color={color} />
    )
}

export default OrderItem