<template>
  <div
    v-if="regShowAlert"
    :class="regAlertVariant"
    class="text-white text-center font-bold p-4 rounded mb-4"
  >
    {{ regAlertMsg }}
  </div>
  <VeeForm @submit="register" :validationSchema="schema" :initialValues="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="name" class="text-red-600" as="div" v-slot="{ message }">
        <p>Error: {{ message }}</p>
      </ErrorMessage>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirmPassword" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </VeeField>
      <ErrorMessage name="country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage name="tos" class="text-red-600 block" />
    </div>
    <button
      :disabled="regInSubmission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: 'RegForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:20|alphaSpaces',
        email: 'required|min:3|max:50|email',
        age: 'required|minValue:18|maxValue:100',
        password: 'required|min:6|max:50|excluded:password',
        confirmPassword: 'passwordsMismatch:@password',
        country: 'required|countryExcluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: 'bg-blue-500',
      regAlertMsg: 'Please wait! Your account is being created.',
    };
  },
  computed: {},
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),
    async register(values) {
      this.regShowAlert = true;
      this.regInSubmission = true;
      this.regAlertVariant = 'bg-blue-500';
      this.regAlertMsg = 'Please wait! Your account is being created.';

      try {
        await this.createUser(values);
      } catch (error) {
        this.regInSubmission = false;
        this.regAlertVariant = 'bg-red-500';
        this.regAlertMsg = 'An unexpected error. Please try again!';
        return;
      }

      this.regAlertVariant = 'bg-green-500';
      this.regAlertMsg = 'Success! Your account has been created.';
      window.location.reload();
    },
  },
};
</script>
