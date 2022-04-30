<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'=>'required|string|min:1|max:255',
            'body'=>'required|string|min:1|max:5000',
            'category_id'=>'required|exists:categories,id',
            'published' => 'required|boolean'
        ];
    }


     protected function prepareForValidation() :void
    {
        $this->merge([
            'published' => $this->boolean('published'),
        ]);
    }
}
