<?php

namespace App\Controller\Admin;

use App\Entity\Specie;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class SpecieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Specie::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
