<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table): void {
            $table->id();
            $table->string('title', 120);
            $table->string('company', 120);
            $table->string('location', 120);
            $table->string('employment_type', 32);
            $table->string('work_arrangement', 32)->nullable();
            $table->text('description');
            $table->timestamps();

            $table->index('title');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
