import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Settings,
  Bell,
  CircleHelp as HelpCircle,
  LogOut,
  CreditCard as Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Users,
  BookOpen,
  ChartBar as BarChart3,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function TeacherProfile() {
  const teacherData = {
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'Mathematics Department, State University',
    joinDate: 'September 2019',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    bio: 'Passionate mathematics educator with over 10 years of experience in teaching algebra, calculus, and statistics. Dedicated to making math accessible and engaging for all students.',
    specializations: ['Algebra', 'Calculus', 'Statistics', 'Linear Algebra'],
    achievements: [
      'Excellence in Teaching Award 2023',
      'Best Online Course Creator 2022',
      'Student Choice Award 2021',
    ],
  };

  const stats = [
    {
      label: 'Students Taught',
      value: '1,247',
      icon: Users,
      color: theme.colors.primary,
    },
    {
      label: 'Courses Created',
      value: '23',
      icon: BookOpen,
      color: theme.colors.secondary,
    },
    {
      label: 'Avg. Rating',
      value: '4.9',
      icon: Award,
      color: theme.colors.accent,
    },
    {
      label: 'Total Quizzes',
      value: '156',
      icon: BarChart3,
      color: theme.colors.info,
    },
  ];

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: Edit, label: 'Edit Profile', onPress: () => {}, destructive: false },
        { icon: Settings, label: 'Account Settings', onPress: () => {}, destructive: false },
        { icon: Bell, label: 'Notifications', onPress: () => {}, destructive: false },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', onPress: () => {}, destructive: false },
        { icon: Mail, label: 'Contact Support', onPress: () => {}, destructive: false },
      ],
    },
    {
      section: 'Account',
      items: [
        { icon: LogOut, label: 'Sign Out', onPress: () => {}, destructive: true },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingVertical: 16
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text.primary }}>Profile</Text>
          <TouchableOpacity>
            <Edit size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 24,
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <Image source={{ uri: teacherData.avatar }} style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text.primary }}>{teacherData.name}</Text>
              <Text style={{ fontSize: 16, color: theme.colors.primary, fontWeight: '600', marginBottom: 8 }}>Mathematics Professor</Text>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Mail size={14} color={theme.colors.text.secondary} />
                  <Text style={{ fontSize: 12, color: theme.colors.text.secondary, marginLeft: 8 }}>{teacherData.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Phone size={14} color={theme.colors.text.secondary} />
                  <Text style={{ fontSize: 12, color: theme.colors.text.secondary, marginLeft: 8 }}>{teacherData.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <MapPin size={14} color={theme.colors.text.secondary} />
                  <Text style={{ fontSize: 12, color: theme.colors.text.secondary, marginLeft: 8 }}>{teacherData.location}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Calendar size={14} color={theme.colors.text.secondary} />
                  <Text style={{ fontSize: 12, color: theme.colors.text.secondary, marginLeft: 8 }}>Joined {teacherData.joinDate}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 14, color: theme.colors.text.secondary, lineHeight: 20, marginBottom: 16 }}>{teacherData.bio}</Text>

          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text.primary, marginBottom: 8 }}>Specializations</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {teacherData.specializations.map((spec, index) => (
                <View key={index} style={{
                  backgroundColor: `${theme.colors.primary}15`,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  marginRight: 8,
                  marginBottom: 8
                }}>
                  <Text style={{ fontSize: 12, color: theme.colors.primary, fontWeight: '600' }}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text.primary, marginBottom: 16 }}>Teaching Statistics</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {stats.map((stat, index) => (
              <View key={index} style={{
                width: (width - 24 * 2 - 8) / 2,
                backgroundColor: theme.colors.surface,
                padding: 16,
                borderRadius: 12,
                marginBottom: 8,
                alignItems: 'center'
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: `${stat.color}15`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8
                }}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.text.primary }}>{stat.value}</Text>
                <Text style={{ fontSize: 12, color: theme.colors.text.secondary, textAlign: 'center' }}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text.primary, marginBottom: 12 }}>Recent Achievements</Text>
          {teacherData.achievements.map((achievement, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.surface,
              padding: 16,
              borderRadius: 12,
              marginBottom: 8
            }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${theme.colors.accent}15`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Award size={20} color={theme.colors.accent} />
              </View>
              <Text style={{ fontSize: 14, color: theme.colors.text.primary, fontWeight: '500', flex: 1 }}>{achievement}</Text>
            </View>
          ))}
        </View>

        {menuItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.text.secondary, paddingHorizontal: 24, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{section.section}</Text>
            <View style={{ backgroundColor: theme.colors.surface, marginHorizontal: 24, borderRadius: 12 }}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity key={itemIndex} onPress={item.onPress} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderBottomWidth: itemIndex !== section.items.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.borderLight
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: item.destructive ? `${theme.colors.error}15` : theme.colors.surfaceLight,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12
                    }}>
                      <item.icon size={20} color={item.destructive ? theme.colors.error : theme.colors.text.secondary} />
                    </View>
                    <Text style={{ fontSize: 14, color: item.destructive ? theme.colors.error : theme.colors.text.primary, fontWeight: '500' }}>{item.label}</Text>
                  </View>
                  <Text style={{ fontSize: 20, color: theme.colors.text.light }}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Text style={{ fontSize: 12, color: theme.colors.text.light }}>MathEdu Pro v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
